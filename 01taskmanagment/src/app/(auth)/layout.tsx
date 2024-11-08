'use client'
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
            <Logo />
          <Button asChild variant='secondary'>
            
              <Link href={pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
              {pathname === '/sign-up' ? 'Sign in' : 'Sign up'}
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
