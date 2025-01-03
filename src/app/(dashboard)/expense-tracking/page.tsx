'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Input } from '@/components/ui/input'
import { InitialExpense, PieDataItem } from '@/lib/definitions'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const initialExpenses: InitialExpense[] = [
  { id: 1, category: 'Groceries', amount: 150, date: '2023-06-01' },
  { id: 2, category: 'Utilities', amount: 200, date: '2023-06-05' },
  { id: 3, category: 'Entertainment', amount: 75, date: '2023-06-10' },
  { id: 4, category: 'Transportation', amount: 100, date: '2023-06-15' },
]

export default function ExpenseTracking() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [searchCategory, setSearchCategory] = useState('')

  const handleEdit = (id: number) => {
    console.log('Editing expense', id)
  }

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense =>
      expense.category.toLowerCase().includes(searchCategory.toLowerCase())
    )
  }, [expenses, searchCategory])

  const pieData = useMemo(() => {
    return filteredExpenses.reduce<PieDataItem[]>((acc, expense) => {
      const existingCategory = acc.find(item => item.name === expense.category)
      if (existingCategory) {
        existingCategory.value += expense.amount
      } else {
        acc.push({ name: expense.category, value: expense.amount })
      }
      return acc
    }, [])
  }, [filteredExpenses])

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Expense Tracking</h1>
        <Link href="/add-expense">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by category"
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map(expense => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(expense.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
