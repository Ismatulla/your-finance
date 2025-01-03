'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  CreditCard,
  DollarSign,
  Wallet,
  UserPlus,
  Menu,
  TrendingUp,
  Users,
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside
        className={`bg-white shadow-md w-64 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">My Finance</h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/dashboard"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/expense-tracking"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <DollarSign className="inline-block w-5 h-5 mr-2" />
            Expenses
          </Link>
          <Link
            href="/cost-management"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <Wallet className="inline-block w-5 h-5 mr-2" />
            Costs
          </Link>
          <Link
            href="/savings-plans"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <TrendingUp className="inline-block w-5 h-5 mr-2" />
            Savings
          </Link>
          <Link
            href="/borrowing-overview"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <CreditCard className="inline-block w-5 h-5 mr-2" />
            Borrowings
          </Link>
          <Link
            href="/subscription"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <UserPlus className="inline-block w-5 h-5 mr-2" />
            Subscription
          </Link>
          <Link
            href="/customer-debts"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Customer Debts
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold text-gray-800">My Finance</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
