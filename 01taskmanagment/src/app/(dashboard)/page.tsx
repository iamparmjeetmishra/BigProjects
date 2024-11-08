import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const user = await getCurrentUser()

  if(!user) redirect("/sign-in")

	return (
		<div>
			<p>This is a Home page.</p>
		</div>
	);
}
