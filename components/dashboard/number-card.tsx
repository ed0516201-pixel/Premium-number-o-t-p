"use client"

import { motion } from "framer-motion"
import { Phone, MoreVertical, MessageSquare, Calendar, Globe } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { PhoneNumber } from "@/lib/types"
import { cn, formatCurrency } from "@/lib/utils"

interface NumberCardProps {
  phoneNumber: PhoneNumber
  index?: number
}

const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  JP: "🇯🇵",
  CA: "🇨🇦",
  AU: "🇦🇺",
}

export function NumberCard({ phoneNumber, index = 0 }: NumberCardProps) {
  const statusConfig = {
    active: {
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      label: "Active",
    },
    inactive: {
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "Inactive",
    },
    pending: {
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      label: "Pending",
    },
  }

  const status = statusConfig[phoneNumber.status]
  const flag = countryFlags[phoneNumber.countryCode] || "🌍"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
            {flag}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{phoneNumber.number}</h3>
            <p className="text-sm text-muted-foreground">{phoneNumber.country}</p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-accent hover:text-accent-foreground group-hover:opacity-100">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Status and Type */}
      <div className="mb-4 flex items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", status.bgColor, status.color)}>
          {status.label}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
          {phoneNumber.type}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2.5">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">OTPs</p>
            <p className="font-semibold text-foreground">{phoneNumber.otpCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2.5">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Expires</p>
            <p className="text-sm font-medium text-foreground">
              {formatDistanceToNow(new Date(phoneNumber.expiresAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Monthly</span>
        <span className="font-semibold text-foreground">{formatCurrency(phoneNumber.monthlyPrice)}</span>
      </div>
    </motion.div>
  )
}
