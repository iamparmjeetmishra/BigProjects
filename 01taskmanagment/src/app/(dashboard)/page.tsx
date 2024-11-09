import { getCurrentUser } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const user = await getCurrentUser()

  if(!user) redirect("/sign-in")

	return (
		<div className="bg-neutral-200 p-4 h-full rounded-xl">
			<CreateWorkspaceForm  />
		</div>
	);
}
