export interface PhoneNumber {
  id: string
  number: string
  country: string
  countryCode: string
  status: "active" | "inactive" | "pending"
  type: "standard" | "premium" | "toll-free"
  monthlyPrice: number
  assignedAt: string
  expiresAt: string
  otpCount: number
  lastOtpAt: string | null
}

export interface OTPCode {
  id: string
  phoneNumberId: string
  phoneNumber: string
  code: string
  sender: string
  message: string
  receivedAt: string
  expiresAt: string
  status: "pending" | "used" | "expired"
}

export interface UsageStats {
  totalNumbers: number
  activeNumbers: number
  totalOtpReceived: number
  otpUsedToday: number
  monthlySpend: number
  balance: number
}

export interface DailyUsage {
  date: string
  otpReceived: number
  otpUsed: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: "free" | "pro" | "enterprise"
  createdAt: string
}
