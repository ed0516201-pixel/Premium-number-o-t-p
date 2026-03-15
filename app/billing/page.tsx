"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { mockUsageStats, mockPhoneNumbers, mockUser } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import {
  CreditCard,
  Plus,
  Download,
  Check,
  Zap,
  Shield,
  Headphones,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "For trying out the platform",
    features: ["1 phone number", "50 OTPs/month", "Basic support", "24h code expiry"],
    current: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For individuals and small teams",
    features: [
      "5 phone numbers",
      "500 OTPs/month",
      "Priority support",
      "Custom code expiry",
      "API access",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    features: [
      "Unlimited numbers",
      "Unlimited OTPs",
      "24/7 dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "SSO/SAML",
    ],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "Dec 1, 2024", amount: 65.95, status: "paid" },
  { id: "INV-002", date: "Nov 1, 2024", amount: 75.94, status: "paid" },
  { id: "INV-003", date: "Oct 1, 2024", amount: 65.95, status: "paid" },
  { id: "INV-004", date: "Sep 1, 2024", amount: 55.96, status: "paid" },
]

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>

        {/* Balance and Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatCurrency(mockUsageStats.balance)}
            </p>
            <button className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Funds
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatCurrency(mockUsageStats.monthlySpend)}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {mockPhoneNumbers.filter((n) => n.status === "active").length} active numbers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-secondary">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">**** 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
              Update payment method
            </button>
          </motion.div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Subscription Plans</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={cn(
                  "relative rounded-xl border bg-card p-6",
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    plan.current
                      ? "border border-border bg-secondary text-muted-foreground cursor-default"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border p-6">
            <h2 className="text-lg font-semibold text-foreground">Billing History</h2>
            <p className="text-sm text-muted-foreground">Download your past invoices</p>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p className="text-sm capitalize text-emerald-500">{invoice.status}</p>
                  </div>
                  <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
