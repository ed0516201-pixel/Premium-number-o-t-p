"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { mockUser } from "@/lib/mock-data"
import {
  User,
  Bell,
  Shield,
  Key,
  Globe,
  Palette,
  Save,
  Eye,
  EyeOff,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Tab = "profile" | "notifications" | "security" | "api"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [showApiKey, setShowApiKey] = useState(false)

  const tabs = [
    { id: "profile" as Tab, label: "Profile", icon: User },
    { id: "notifications" as Tab, label: "Notifications", icon: Bell },
    { id: "security" as Tab, label: "Security", icon: Shield },
    { id: "api" as Tab, label: "API Keys", icon: Key },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full rounded-xl border border-border bg-card p-2 lg:w-64"
          >
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 rounded-xl border border-border bg-card p-6"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                    {mockUser.name.charAt(0)}
                  </div>
                  <div>
                    <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      Change Avatar
                    </button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Timezone
                    </label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
                      <option>UTC (GMT+0)</option>
                      <option>EST (GMT-5)</option>
                      <option>PST (GMT-8)</option>
                      <option>CET (GMT+1)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Language
                    </label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>

                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to be notified
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "New OTP Received",
                      description: "Get notified when a new OTP code arrives",
                    },
                    {
                      title: "Number Expiring",
                      description: "Alert before your number subscription expires",
                    },
                    {
                      title: "Low Balance",
                      description: "Notify when account balance is low",
                    },
                    {
                      title: "Weekly Summary",
                      description: "Receive a weekly usage report",
                    },
                    {
                      title: "Marketing Updates",
                      description: "News about new features and promotions",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          defaultChecked={index < 3}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your account security
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Password</p>
                        <p className="text-sm text-muted-foreground">
                          Last changed 30 days ago
                        </p>
                      </div>
                      <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Active Sessions</p>
                        <p className="text-sm text-muted-foreground">
                          2 devices currently logged in
                        </p>
                      </div>
                      <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                        Manage Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your API access credentials
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="mb-2 text-sm font-medium text-foreground">Your API Key</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-secondary px-4 py-2 font-mono text-sm text-foreground">
                      {showApiKey
                        ? "pk_live_51ABC123XYZ456789DEF"
                        : "pk_live_***********************"}
                    </code>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Keep this key secret. Do not share it publicly.
                  </p>
                </div>

                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  <Key className="h-4 w-4" />
                  Generate New Key
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
