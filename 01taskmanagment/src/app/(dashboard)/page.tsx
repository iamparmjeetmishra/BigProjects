import { getCurrentUser } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const user = await getCurrentUser()

  if(!user) redirect("/sign-in")

	return (
		<div>
			<p>Only Visible to authorized user.</p>
			<UserButton />
		</div>
	);
}
