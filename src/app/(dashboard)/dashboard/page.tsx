'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  DollarSign,
  TrendingUp,
  CreditCard,
  Edit,
  Trash,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { DashboardData, Timeframe, Transaction } from '@/lib/definitions'

const data: DashboardData = {
  daily: [
    { name: 'Mon', Income: 400, Expenses: 240 },
    { name: 'Tue', Income: 300, Expenses: 139 },
    { name: 'Wed', Income: 200, Expenses: 980 },
    { name: 'Thu', Income: 278, Expenses: 390 },
    { name: 'Fri', Income: 189, Expenses: 480 },
    { name: 'Sat', Income: 239, Expenses: 380 },
    { name: 'Sun', Income: 349, Expenses: 430 },
  ],
  weekly: [
    { name: 'Week 1', Income: 2000, Expenses: 1400 },
    { name: 'Week 2', Income: 1800, Expenses: 1200 },
    { name: 'Week 3', Income: 2200, Expenses: 1600 },
    { name: 'Week 4', Income: 2400, Expenses: 1800 },
  ],
  monthly: [
    { name: 'Jan', Income: 4000, Expenses: 2400 },
    { name: 'Feb', Income: 3000, Expenses: 1398 },
    { name: 'Mar', Income: 2000, Expenses: 9800 },
    { name: 'Apr', Income: 2780, Expenses: 3908 },
    { name: 'May', Income: 1890, Expenses: 4800 },
    { name: 'Jun', Income: 2390, Expenses: 3800 },
  ],
  yearly: [
    { name: '2019', Income: 40000, Expenses: 24000 },
    { name: '2020', Income: 45000, Expenses: 28000 },
    { name: '2021', Income: 48000, Expenses: 32000 },
    { name: '2022', Income: 52000, Expenses: 36000 },
    { name: '2023', Income: 58000, Expenses: 42000 },
  ],
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: 'Salary',
      amount: 5000,
      type: 'Income',
      date: '2023-06-01',
    },
    {
      id: 2,
      description: 'Rent',
      amount: -1000,
      type: 'Expense',
      date: '2023-06-05',
    },
    {
      id: 3,
      description: 'Groceries',
      amount: -200,
      type: 'Expense',
      date: '2023-06-10',
    },
    {
      id: 4,
      description: 'Freelance Work',
      amount: 1500,
      type: 'Income',
      date: '2023-07-15',
    },
    {
      id: 5,
      description: 'Utilities',
      amount: -150,
      type: 'Expense',
      date: '2023-07-20',
    },
  ])

  const [timeframe, setTimeframe] = useState<Timeframe>('monthly')
  const [searchMonth, setSearchMonth] = useState<string>('')
  const [searchDescription, setSearchDescription] = useState<string>('')
  const [sortType, setSortType] = useState<string>('all')

  const handleEdit = (id: number) => {
    console.log('Editing transaction', id)
  }

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const monthMatch = searchMonth
        ? new Date(transaction.date)
            .toLocaleString('default', { month: 'long' })
            .toLowerCase()
            .includes(searchMonth.toLowerCase())
        : true
      const descriptionMatch = transaction.description
        .toLowerCase()
        .includes(searchDescription.toLowerCase())
      const typeMatch =
        sortType === 'all' ||
        transaction.type.toLowerCase() === sortType.toLowerCase()
      return monthMatch && descriptionMatch && typeMatch
    })
  }, [transactions, searchMonth, searchDescription, sortType])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,678</div>
            <p className="text-xs text-muted-foreground">
              +10.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Borrowings
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345</div>
            <p className="text-xs text-muted-foreground">
              -5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,234</div>
            <p className="text-xs text-muted-foreground">
              +8.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Financial Overview</CardTitle>
            <Select
              value={timeframe}
              onValueChange={(value: string) =>
                setTimeframe(value as Timeframe)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data[timeframe]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Income" fill="#8884d8" />
                  <Bar dataKey="Expenses" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Search by month"
              value={searchMonth}
              onChange={e => setSearchMonth(e.target.value)}
              className="w-full sm:w-1/3"
            />
            <Input
              placeholder="Search by description"
              value={searchDescription}
              onChange={e => setSearchDescription(e.target.value)}
              className="w-full sm:w-1/3"
            />
            <Select value={sortType} onValueChange={setSortType}>
              <SelectTrigger className="w-full sm:w-1/3">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${Math.abs(transaction.amount)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(transaction.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-4">
        <Link href="/add-transaction">
          <Button>Add Transaction</Button>
        </Link>
      </div>
    </div>
  )
}
