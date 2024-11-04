import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
            <Image src="/logo.svg" alt="logo" width={150} height={100} />
                <Button asChild variant='secondary'>
              <Link href='/sign-up'>
                  Sign Up
              </Link>
                </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  )
}
