"use client"

import { Bell, Search, User, Plus } from "lucide-react"
import { mockUser, mockUsageStats } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search numbers, OTP codes..."
          className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Balance */}
        <div className="hidden items-center gap-2 rounded-lg bg-secondary px-4 py-2 md:flex">
          <span className="text-sm text-muted-foreground">Balance:</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(mockUsageStats.balance)}
          </span>
        </div>

        {/* Add Number Button */}
        <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Number</span>
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{mockUser.plan} Plan</p>
          </div>
        </button>
      </div>
    </header>
  )
}
