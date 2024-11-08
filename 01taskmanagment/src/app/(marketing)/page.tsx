"use client"
import { useCurrentUser } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { UserButton } from "@/features/auth/components/user-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter()
  const { data, isLoading } = useCurrentUser()
  console.log(data)
  const {mutate} = useLogout()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in")
    }
  }, [data])

  return <div>
    <p>Only Visible to authorized user.</p>
    <UserButton />
  </div>;
}
