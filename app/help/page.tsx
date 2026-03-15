"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How do I add a new phone number?",
    answer:
      "Navigate to the Numbers page and click the 'Add New Number' button. You can choose from available numbers in different countries. Select your preferred number type (standard, premium, or toll-free) and complete the purchase process.",
  },
  {
    question: "Why is my OTP code showing as expired?",
    answer:
      "OTP codes typically expire within 5-10 minutes of being received for security purposes. If your code shows as expired, you'll need to request a new verification code from the service you're trying to access.",
  },
  {
    question: "Can I use the same number for multiple services?",
    answer:
      "Yes! Each phone number you rent can receive OTP codes from multiple services simultaneously. All codes will appear in your OTP Codes dashboard, organized by sender.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go to Settings > Billing and click on your current plan. You'll see an option to cancel or downgrade your subscription. Note that any remaining balance will be credited to your account for future use.",
  },
  {
    question: "What happens when my number expires?",
    answer:
      "When a number expires, it will be marked as 'Inactive' and you'll no longer receive OTP codes on that number. You can renew it from the Numbers page before expiration to maintain continuous service.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted in transit and at rest. We never share your information with third parties, and OTP codes are automatically deleted after 30 days.",
  },
]

const categories = [
  {
    title: "Getting Started",
    icon: Book,
    articles: ["Quick Start Guide", "Account Setup", "First Number Purchase"],
  },
  {
    title: "Managing Numbers",
    icon: MessageCircle,
    articles: ["Adding Numbers", "Number Types Explained", "Renewal & Expiration"],
  },
  {
    title: "Billing & Payments",
    icon: Mail,
    articles: ["Payment Methods", "Invoices & Receipts", "Refund Policy"],
  },
]

export default function HelpPage() {
  const [search, setSearch] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="mt-2 text-muted-foreground">
            Find answers to common questions or get in touch with support
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {article}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-border">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="p-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-xl border border-primary/50 bg-primary/5 p-6 text-center"
        >
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Still need help?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Our support team is here to assist you 24/7
          </p>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Mail className="h-4 w-4" />
            Contact Support
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
