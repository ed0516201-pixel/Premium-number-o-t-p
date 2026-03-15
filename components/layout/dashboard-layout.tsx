"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context"
import { motion } from "framer-motion"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.div
        initial={false}
        animate={{ paddingLeft: collapsed ? 80 : 280 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Header />
        <main className="p-6">{children}</main>
      </motion.div>
    </div>
  )
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
