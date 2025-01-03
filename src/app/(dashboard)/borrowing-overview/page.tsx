'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CreditCard, TrendingDown, Plus, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import { Loans } from '@/lib/definitions'
const initialLoans: Loans[] = [
  {
    id: 1,
    type: 'Mortgage',
    amount: 200000,
    interestRate: 3.5,
    monthlyPayment: 1500,
  },
  {
    id: 2,
    type: 'Car Loan',
    amount: 15000,
    interestRate: 4.5,
    monthlyPayment: 350,
  },
  {
    id: 3,
    type: 'Personal Loan',
    amount: 5000,
    interestRate: 6,
    monthlyPayment: 150,
  },
]

export default function BorrowingOverview() {
  const [loans, setLoans] = useState<Loans[]>(initialLoans)
  const totalDebt = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const totalMonthlyPayments = loans.reduce(
    (sum, loan) => sum + loan.monthlyPayment,
    0
  )
  const averageInterestRate =
    loans.reduce((sum, loan) => sum + loan.interestRate, 0) / loans.length

  const handleEdit = (id: number) => {
    // Implement edit logic here
    console.log('Editing loan', id)
  }

  const handleDelete = (id: number) => {
    setLoans(loans.filter(loan => loan.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Borrowing Overview</h1>
        <Link href="/add-loan">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Loan
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalDebt.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Payments
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalMonthlyPayments.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Interest Rate
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageInterestRate.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Monthly Payment</TableHead>
                {/* <TableHead></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map(loan => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.type}</TableCell>
                  <TableCell>${loan.amount.toLocaleString()}</TableCell>
                  <TableCell>{loan.interestRate}%</TableCell>
                  <TableCell>${loan.monthlyPayment}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(loan.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(loan.id)}
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
      <Card>
        <CardHeader>
          <CardTitle>Loan Repayment Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Principal" stackId="a" fill="#8884d8" />
                <Bar dataKey="Interest" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
const chartData = [
  { name: 'Year 1', Principal: 5000, Interest: 1000 },
  { name: 'Year 2', Principal: 5200, Interest: 800 },
  { name: 'Year 3', Principal: 5400, Interest: 600 },
  { name: 'Year 4', Principal: 5600, Interest: 400 },
  { name: 'Year 5', Principal: 5800, Interest: 200 },
]
