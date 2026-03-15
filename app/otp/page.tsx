"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { OTPCard } from "@/components/dashboard/otp-card"
import { mockOTPCodes, mockPhoneNumbers } from "@/lib/mock-data"
import { Search, RefreshCw, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "pending" | "used" | "expired"

export default function OTPPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [selectedNumber, setSelectedNumber] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredOTPs = mockOTPCodes.filter((otp) => {
    const matchesSearch =
      otp.sender.toLowerCase().includes(search.toLowerCase()) ||
      otp.code.includes(search) ||
      otp.message.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || otp.status === filter
    const matchesNumber = selectedNumber === "all" || otp.phoneNumberId === selectedNumber
    return matchesSearch && matchesFilter && matchesNumber
  })

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "used", label: "Used" },
    { value: "expired", label: "Expired" },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">OTP Codes</h1>
            <p className="text-muted-foreground">
              View and manage all received verification codes
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by sender, code, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Number Filter */}
            <select
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Numbers</option>
              {mockPhoneNumbers.map((number) => (
                <option key={number.id} value={number.id}>
                  {number.number}
                </option>
              ))}
            </select>
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

        {/* OTP Cards */}
        {filteredOTPs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOTPs.map((otp, index) => (
              <OTPCard key={otp.id} otp={otp} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">No OTP codes found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
