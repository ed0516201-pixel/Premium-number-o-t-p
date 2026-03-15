"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { format, parseISO } from "date-fns"
import { mockDailyUsage } from "@/lib/mock-data"

export function UsageChart() {
  const data = mockDailyUsage.map((item) => ({
    ...item,
    date: format(parseISO(item.date), "EEE"),
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">OTP Usage</h3>
          <p className="text-sm text-muted-foreground">Last 7 days activity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Received</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-muted-foreground">Used</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 69%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 69%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 15%)",
                border: "1px solid hsl(217, 33%, 20%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
            />
            <Area
              type="monotone"
              dataKey="otpReceived"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReceived)"
              name="Received"
            />
            <Area
              type="monotone"
              dataKey="otpUsed"
              stroke="hsl(152, 69%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsed)"
              name="Used"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
