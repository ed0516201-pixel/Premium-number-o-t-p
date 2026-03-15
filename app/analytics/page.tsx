"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { mockUsageStats, mockPhoneNumbers, mockOTPCodes } from "@/lib/mock-data"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  // Calculate some stats
  const pendingOTPs = mockOTPCodes.filter((o) => o.status === "pending").length
  const usedOTPs = mockOTPCodes.filter((o) => o.status === "used").length
  const expiredOTPs = mockOTPCodes.filter((o) => o.status === "expired").length
  const totalOTPs = mockOTPCodes.length

  const senderStats = mockOTPCodes.reduce(
    (acc, otp) => {
      acc[otp.sender] = (acc[otp.sender] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const topSenders = Object.entries(senderStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const countryStats = mockPhoneNumbers.reduce(
    (acc, num) => {
      acc[num.country] = (acc[num.country] || 0) + num.otpCount
      return acc
    },
    {} as Record<string, number>
  )

  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your OTP usage and performance
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total OTPs Received"
            value={mockUsageStats.totalOtpReceived}
            change="+23% from last month"
            changeType="positive"
            icon={MessageSquare}
            iconColor="bg-primary/10 text-primary"
            delay={0}
          />
          <StatsCard
            title="Success Rate"
            value="94.2%"
            change="+2.1% improvement"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-emerald-500/10 text-emerald-500"
            delay={0.1}
          />
          <StatsCard
            title="Avg. Response Time"
            value="2.3s"
            change="-0.5s faster"
            changeType="positive"
            icon={Clock}
            iconColor="bg-amber-500/10 text-amber-500"
            delay={0.2}
          />
          <StatsCard
            title="Active Numbers"
            value={mockUsageStats.activeNumbers}
            change={`of ${mockUsageStats.totalNumbers} total`}
            changeType="neutral"
            icon={Phone}
            iconColor="bg-blue-500/10 text-blue-500"
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Usage Chart */}
          <UsageChart />

          {/* OTP Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground">OTP Status Distribution</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Used</span>
                  <span className="font-medium text-foreground">
                    {usedOTPs} ({Math.round((usedOTPs / totalOTPs) * 100)}%)
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${(usedOTPs / totalOTPs) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium text-foreground">
                    {pendingOTPs} ({Math.round((pendingOTPs / totalOTPs) * 100)}%)
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${(pendingOTPs / totalOTPs) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expired</span>
                  <span className="font-medium text-foreground">
                    {expiredOTPs} ({Math.round((expiredOTPs / totalOTPs) * 100)}%)
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{ width: `${(expiredOTPs / totalOTPs) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Lists */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Senders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground">Top OTP Senders</h3>
            <div className="space-y-4">
              {topSenders.map(([sender, count], index) => (
                <div key={sender} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">{sender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{count} OTPs</span>
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground">OTPs by Country</h3>
            <div className="space-y-4">
              {topCountries.map(([country, count], index) => (
                <div key={country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">{country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{count} OTPs</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
