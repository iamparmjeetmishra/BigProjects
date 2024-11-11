import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
	DATABASE_ID,
	IMAGES_BUCKET_ID,
	WORKSPACES_ID,
} from "@/lib/constants";
import { ID } from "node-appwrite";

const app = new Hono()
	.get("/", sessionMiddleware, async (c) => {
		const databases = c.get("databases");

		const workspaces = await databases.listDocuments(
			DATABASE_ID,
			WORKSPACES_ID
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
          const svgString = Buffer.from(arrayBuffer).toString("utf-8");
					uploadedImageUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
				} else {
          const imgString = Buffer.from(arrayBuffer).toString("base64")
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
				}
			);
			return c.json({ data: workspace });
		}
	);

export default app;
