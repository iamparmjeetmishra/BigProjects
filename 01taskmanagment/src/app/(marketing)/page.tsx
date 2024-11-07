"use client"

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
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
    <Button onClick={() => mutate()}>Logout</Button>
  </div>;
}
