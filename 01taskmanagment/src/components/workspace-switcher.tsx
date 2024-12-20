"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

export default function WorkspaceSwithcer() {
	const { data: workspaces } = useGetWorkspaces();
	// console.log(workspaces)
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between">
				<p className="text-xs uppercase text-neutral-500">
					Workspaces
				</p>
				<RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
			</div>
			<Select>
				<SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
					<SelectValue placeholder="No workspace selected" />
				</SelectTrigger>
				<SelectContent>
					{workspaces?.data.total === 0 ? (
						<SelectItem value="no-workspaces">
							<span className="text-neutral-500">
								No workspaces found
							</span>
						</SelectItem>
					) : (
						workspaces?.data.documents?.map((workspace) => (
							<SelectItem key={workspace.$id} value={workspace.$id}>
								<div className="flex justify-start items-center gap-3 font-medium">
									<WorkspaceAvatar
										name={workspace.name}
										image={workspace.imageUrl}
									/>
									<span className="truncate">{workspace.name}</span>
								</div>
							</SelectItem>
						))
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
