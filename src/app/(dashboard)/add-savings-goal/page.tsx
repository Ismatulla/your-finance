'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddSavingsGoal() {
  const [goalName, setGoalName] = useState<string>('')
  const [targetAmount, setTargetAmount] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New savings goal:', { goalName, targetAmount })
    // Reset form
    setGoalName('')
    setTargetAmount('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Savings Goal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Savings Goal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="goalName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Goal Name
                </label>
                <Input
                  id="goalName"
                  type="text"
                  placeholder="Enter goal name"
                  value={goalName}
                  onChange={e => setGoalName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="targetAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Target Amount
                </label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="Enter target amount"
                  value={targetAmount}
                  onChange={e => setTargetAmount(e.target.value)}
                  required
                  min={1}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black"
            >
              Add Savings Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
