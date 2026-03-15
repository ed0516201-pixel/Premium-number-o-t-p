"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { NumberCard } from "@/components/dashboard/number-card"
import { mockPhoneNumbers } from "@/lib/mock-data"
import { Search, Filter, Plus, Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "active" | "inactive" | "pending"
type ViewMode = "grid" | "list"

export default function NumbersPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filteredNumbers = mockPhoneNumbers.filter((number) => {
    const matchesSearch =
      number.number.toLowerCase().includes(search.toLowerCase()) ||
      number.country.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || number.status === filter
    return matchesSearch && matchesFilter
  })

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Phone Numbers</h1>
            <p className="text-muted-foreground">
              Manage your virtual phone numbers for OTP verification
            </p>
          </div>
          <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add New Number
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            {/* Search */}
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search numbers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    filter === option.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Numbers Grid/List */}
        {filteredNumbers.length > 0 ? (
          <div
            className={cn(
              "grid gap-4",
              viewMode === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {filteredNumbers.map((number, index) => (
              <NumberCard key={number.id} phoneNumber={number} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">No numbers found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
