"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <Link
        href="/"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/" ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/environments"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/environments") ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        Environments
      </Link>
      <Link
        href="/documents"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/documents") ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        Documents
      </Link>
      <Link
        href="/sharepoint"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/sharepoint") ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        SharePoint
      </Link>
      <Link
        href="/teams"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/teams") ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        Teams
      </Link>
      <Link
        href="/onedrive"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/onedrive") ? "text-foreground font-medium" : "text-foreground/60",
        )}
      >
        OneDrive
      </Link>
    </nav>
  )
}
