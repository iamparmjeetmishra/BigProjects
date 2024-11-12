import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
	DATABASE_ID,
	GenerateInviteCodeLength,
	IMAGES_BUCKET_ID,
	MEMBERS_ID,
	WORKSPACES_ID,
} from "@/lib/constants";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { GenerateInviteCode } from "@/lib/utils";

const app = new Hono()
	.get("/", sessionMiddleware, async (c) => {
		const user = c.get("user");
		const databases = c.get("databases");

		const members = await databases.listDocuments(
			DATABASE_ID,
			MEMBERS_ID,
			[Query.equal("userId", user.$id)]
		);

		if (members.total === 0) {
			return c.json({ data: { documents: [], total: 0 } });
		}

		const workspaceIds = members.documents.map(
			(member) => member.workspaceId
		);

		const workspaces = await databases.listDocuments(
			DATABASE_ID,
			WORKSPACES_ID,
			[
				Query.orderDesc("createdAt"),
				Query.contains("$id", workspaceIds),
			]
		);

		return c.json({ data: workspaces });
	})
	.post(
		"/",
		zValidator("form", createWorkspaceSchema),
		sessionMiddleware,
		async (c) => {
			const databases = c.get("databases");
			const user = c.get("user");
			const storage = c.get("storage");

			const { name, image } = c.req.valid("form");

			let uploadedImageUrl: string | undefined;

			//handling images
			if (image instanceof File) {
				const file = await storage.createFile(
					IMAGES_BUCKET_ID,
					ID.unique(),
					image
				);
				// we have to create image buffer from base64 string

				const arrayBuffer = await storage.getFileView(
					IMAGES_BUCKET_ID,
					file.$id
				);
				console.log(arrayBuffer);

				// Into Base64 sting
				if (image.type === "image/svg+xml") {
					// converting utf-8 string for svg
					const svgString =
						Buffer.from(arrayBuffer).toString("utf-8");
					uploadedImageUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
				} else {
					const imgString =
						Buffer.from(arrayBuffer).toString("base64");
					uploadedImageUrl = `data:image/png;base64,${imgString}`;
				}
			}

			const workspace = await databases.createDocument(
				DATABASE_ID,
				WORKSPACES_ID,
				ID.unique(),
				{
					name,
					userId: user.$id,
					imageUrl: uploadedImageUrl,
					inviteCode: GenerateInviteCode(GenerateInviteCodeLength),
				}
			);

			await databases.createDocument(
				DATABASE_ID,
				MEMBERS_ID,
				ID.unique(),
				{
					userId: user.$id,
					workspaceId: workspace.$id,
					role: MemberRole["ADMIN"],
				}
			);

			return c.json({ data: workspace });
		}
	);

export default app;
