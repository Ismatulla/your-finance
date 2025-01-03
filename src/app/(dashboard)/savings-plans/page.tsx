'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, Plus, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import { ChartData, SavingGolasData } from '@/lib/definitions'
const chartData: ChartData[] = [
  { name: 'Jan', savings: 1000 },
  { name: 'Feb', savings: 2000 },
  { name: 'Mar', savings: 3000 },
  { name: 'Apr', savings: 3500 },
  { name: 'May', savings: 4200 },
  { name: 'Jun', savings: 5000 },
]

export default function SavingsPlans() {
  const [savingsGoals, setSavingsGoals] = useState<SavingGolasData[]>([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000 },
    { id: 2, name: 'Vacation', target: 5000, current: 2000 },
    { id: 3, name: 'New Car', target: 20000, current: 8000 },
  ])

  const handleEdit = (id: number) => {
    // Implement edit logic here
    console.log('Editing savings goal', id)
  }

  const handleDelete = (id: number) => {
    setSavingsGoals(savingsGoals.filter(goal => goal.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Savings Plans</h1>
        <Link href="/add-savings-goal">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Savings Goal
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsGoals.map(goal => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {goal.name}
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(goal.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(goal.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>{Math.round((goal.current / goal.target) * 100)}%</span>
              </div>
              <Progress
                value={(goal.current / goal.target) * 100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current: ${goal.current}</span>
                <span>Target: ${goal.target}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
