import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { NumberCard } from "@/components/dashboard/number-card"
import { mockUsageStats, mockPhoneNumbers } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import {
  Phone,
  MessageSquare,
  Wallet,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const activeNumbers = mockPhoneNumbers.filter((n) => n.status === "active").slice(0, 3)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here{"'"}s an overview of your OTP services.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Numbers"
            value={mockUsageStats.activeNumbers}
            change={`${mockUsageStats.totalNumbers} total numbers`}
            changeType="neutral"
            icon={Phone}
            iconColor="bg-primary/10 text-primary"
            delay={0}
          />
          <StatsCard
            title="OTPs Received"
            value={mockUsageStats.totalOtpReceived}
            change={`+${mockUsageStats.otpUsedToday} today`}
            changeType="positive"
            icon={MessageSquare}
            iconColor="bg-emerald-500/10 text-emerald-500"
            delay={0.1}
          />
          <StatsCard
            title="Monthly Spend"
            value={formatCurrency(mockUsageStats.monthlySpend)}
            change="-12% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-amber-500/10 text-amber-500"
            delay={0.2}
          />
          <StatsCard
            title="Balance"
            value={formatCurrency(mockUsageStats.balance)}
            change="Add funds"
            changeType="neutral"
            icon={Wallet}
            iconColor="bg-blue-500/10 text-blue-500"
            delay={0.3}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UsageChart />
          <RecentActivity />
        </div>

        {/* Active Numbers Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your Active Numbers</h2>
            <Link
              href="/numbers"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              View all numbers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeNumbers.map((number, index) => (
              <NumberCard key={number.id} phoneNumber={number} index={index} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
