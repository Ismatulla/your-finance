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

export default function AddTransaction() {
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [type, setType] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New transaction:', { amount, category, type })
    // Reset form
    setAmount('')
    setCategory('')
    setType('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
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
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className=" bg-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black"
            >
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
