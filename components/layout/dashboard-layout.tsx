"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[280px] transition-all duration-200">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
