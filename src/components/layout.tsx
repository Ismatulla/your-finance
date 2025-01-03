import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="py-6 bg-white shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">My Finance</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/expense-tracking" className="text-gray-600 hover:text-gray-900">Expenses</Link></li>
              <li><Link href="/cost-management" className="text-gray-600 hover:text-gray-900">Costs</Link></li>
              <li><Link href="/savings-plans" className="text-gray-600 hover:text-gray-900">Savings</Link></li>
              <li><Link href="/borrowing-overview" className="text-gray-600 hover:text-gray-900">Borrowings</Link></li>
              <li><Link href="/subscription" className="text-gray-600 hover:text-gray-900">Subscription</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="py-6 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 My Finance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

