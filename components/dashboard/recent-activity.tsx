"use client"

import { motion } from "framer-motion"
import { MessageSquare, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { mockOTPCodes } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function RecentActivity() {
  const recentOTPs = mockOTPCodes.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent OTP Codes</h3>
          <p className="text-sm text-muted-foreground">Latest verification codes received</p>
        </div>
        <Link
          href="/otp"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-border">
        {recentOTPs.map((otp, index) => (
          <motion.div
            key={otp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center justify-between p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{otp.sender}</span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-xs font-medium",
                      otp.status === "pending" && "bg-amber-500/10 text-amber-500",
                      otp.status === "used" && "bg-emerald-500/10 text-emerald-500",
                      otp.status === "expired" && "bg-red-500/10 text-red-500"
                    )}
                  >
                    {otp.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{otp.phoneNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-bold text-foreground">{otp.code}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(otp.receivedAt), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
