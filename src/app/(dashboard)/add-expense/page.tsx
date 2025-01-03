'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AddExpense() {
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [date, setDate] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New expense:', { amount, category, date })
    // Reset form
    setAmount('')
    setCategory('')
    setDate('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Expense</h1>
      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-black text-white"
              variant="secondary"
            >
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
