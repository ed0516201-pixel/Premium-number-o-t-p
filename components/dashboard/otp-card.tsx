"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Clock, CheckCircle, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { OTPCode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface OTPCardProps {
  otp: OTPCode
  index?: number
}

export function OTPCard({ otp, index = 0 }: OTPCardProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(otp.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      label: "Pending",
    },
    used: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      label: "Used",
    },
    expired: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "Expired",
    },
  }

  const status = statusConfig[otp.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Sender and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{otp.sender}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", status.bgColor, status.color)}>
                {status.label}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(otp.receivedAt), { addSuffix: true })}
            </span>
          </div>

          {/* Phone Number */}
          <p className="text-sm text-muted-foreground">{otp.phoneNumber}</p>

          {/* OTP Code */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2">
              {otp.code.split("").map((digit, i) => (
                <span key={i} className="font-mono text-2xl font-bold text-foreground">
                  {digit}
                </span>
              ))}
            </div>
            <button
              onClick={copyCode}
              disabled={otp.status !== "pending"}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                otp.status === "pending"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          {/* Message Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2">{otp.message}</p>
        </div>
      </div>
    </motion.div>
  )
}
