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
import { Plus, Edit, Trash, ArrowUpDown } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { InitialCost } from '@/lib/definitions'

const initialCosts: InitialCost[] = [
  { id: 1, category: 'Housing', amount: 1000, budget: 1200 },
  { id: 2, category: 'Transportation', amount: 300, budget: 400 },
  { id: 3, category: 'Food', amount: 500, budget: 600 },
  { id: 4, category: 'Utilities', amount: 200, budget: 250 },
]

type SortColumn = keyof InitialCost | 'remaining'

export default function CostManagement() {
  const [costs, setCosts] = useState<InitialCost[]>(initialCosts)
  const [searchCategory, setSearchCategory] = useState('')
  const [sortColumn, setSortColumn] = useState<SortColumn>('id')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleEdit = (id: number) => {
    console.log('Editing cost', id)
  }

  const handleDelete = (id: number) => {
    setCosts(costs.filter(cost => cost.id !== id))
  }

  const handleSort = (column: SortColumn) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedCosts = useMemo(() => {
    const result = costs.filter(cost =>
      cost.category.toLowerCase().includes(searchCategory.toLowerCase())
    )

    if (sortColumn) {
      result.sort((a, b) => {
        let aValue: string | number = 0
        let bValue: string | number = 0
        if (sortColumn == 'remaining') {
          aValue = a.budget - a.amount
        } else {
          aValue = a[sortColumn]
          bValue = b[sortColumn]
        }
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [costs, searchCategory, sortColumn, sortDirection])

  const chartData = filteredAndSortedCosts.map(cost => ({
    name: cost.category,
    Spent: cost.amount,
    Budget: cost.budget,
  }))

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cost Management</h1>
        <Link href="/set-budget">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Set Budget
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cost Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by category"
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('category')}>
                    Category{' '}
                    {sortColumn === 'category' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('amount')}>
                    Spent{' '}
                    {sortColumn === 'amount' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('budget')}>
                    Budget{' '}
                    {sortColumn === 'budget' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('remaining')}>
                    Remaining{' '}
                    {sortColumn === 'remaining' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCosts.map(cost => (
                  <TableRow key={cost.id}>
                    <TableCell>{cost.category}</TableCell>
                    <TableCell>${cost.amount}</TableCell>
                    <TableCell>${cost.budget}</TableCell>
                    <TableCell>${cost.budget - cost.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(cost.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cost.id)}
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
            <CardTitle>Budget vs. Actual</CardTitle>
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
                  <Bar dataKey="Spent" fill="#8884d8" />
                  <Bar dataKey="Budget" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
