import { z } from 'zod'
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 character long' })
    .trim(),
  email: z.string().email({ message: 'PLease enter valid email' }),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    }),
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type User = {
  id: string
  email: string
  password: string
}
export interface Loans {
  id: number
  type: string
  amount: number
  interestRate: number
  monthlyPayment: number
}

export interface InitialCost {
  id: number
  category: string
  amount: number
  budget: number
}
type DueDateType = string | Date

export interface Dept {
  id: number
  name: string
  amount: number
  dueDate: DueDateType
  status: string
  phone: string
  items: string[]
}
export interface SingleDept extends Omit<Dept, 'dueDate' | 'id' | 'status'> {
  dueDate: Date
}
export interface DashboardEntry {
  name: string
  Income: number
  Expenses: number
}
export interface DashboardData {
  daily: DashboardEntry[]
  weekly: DashboardEntry[]
  monthly: DashboardEntry[]
  yearly: DashboardEntry[]
}
export interface Transaction {
  id: number
  description: string
  amount: number
  type: string
  date: string
}
export type Timeframe = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface InitialExpense {
  id: number
  category: string
  amount: number
  date: string
}
export interface PieDataItem {
  name: string
  value: number
}
export interface ChartData {
  name: string
  savings: number
}
export interface SavingGolasData {
  id: number
  name: string
  target: number
  current: number
}
