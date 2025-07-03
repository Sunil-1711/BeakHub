"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MobileNavProps {
  setOpen: (open: boolean) => void
}

export function MobileNav({ setOpen }: MobileNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/environments",
      label: "Environments",
      active: pathname?.startsWith("/environments"),
    },
    {
      href: "/documents",
      label: "Documents",
      active: pathname?.startsWith("/documents"),
    },
    {
      href: "/sharepoint",
      label: "SharePoint",
      active: pathname?.startsWith("/sharepoint"),
    },
    {
      href: "/teams",
      label: "Teams",
      active: pathname?.startsWith("/teams"),
    },
    {
      href: "/onedrive",
      label: "OneDrive",
      active: pathname?.startsWith("/onedrive"),
    },
  ]

  return (
    <div className="flex flex-col gap-6 pr-6">
      <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
        <span className="font-bold">BeakOps Intranet</span>
      </Link>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="flex flex-col gap-2 pr-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center py-2 text-base font-medium transition-colors hover:text-foreground/80",
                route.active ? "text-foreground font-medium" : "text-foreground/60",
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
