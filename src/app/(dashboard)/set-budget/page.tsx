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

export default function SetBudget() {
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New budget:', { category, budget })
    // Reset form
    setCategory('')
    setBudget('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Set Budget</h1>
      <Card>
        <CardHeader>
          <CardTitle>Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
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
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Budget
                </label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-black text-white"
            >
              Set Budget
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
