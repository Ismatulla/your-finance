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

export default function AddLoan() {
  const [loanType, setLoanType] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [monthlyPayment, setMonthlyPayment] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New loan:', { loanType, amount, interestRate, monthlyPayment })
    // Reset form
    setLoanType('')
    setAmount('')
    setInterestRate('')
    setMonthlyPayment('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Loan</h1>
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="loanType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Loan Type
                </label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="carLoan">Car Loan</SelectItem>
                    <SelectItem value="personalLoan">Personal Loan</SelectItem>
                    <SelectItem value="studentLoan">Student Loan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  placeholder="Enter loan amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="interestRate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Interest Rate (%)
                </label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="Enter interest rate"
                  value={interestRate}
                  onChange={e => setInterestRate(e.target.value)}
                  required
                  min={0}
                />
              </div>
              <div>
                <label
                  htmlFor="monthlyPayment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Monthly Payment
                </label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  placeholder="Enter monthly payment"
                  value={monthlyPayment}
                  onChange={e => setMonthlyPayment(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-black hover:bg-black"
            >
              Add Loan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
