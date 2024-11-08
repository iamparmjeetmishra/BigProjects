import { getCurrentUser } from "@/features/auth/actions";
import SignInCard from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

export default async function SignInPage() {

  const user = await getCurrentUser()

  if(user) redirect("/")

  return (
    <main>
      <SignInCard />
    </main>
  )
}
