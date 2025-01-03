'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dept } from '@/lib/definitions'

const initialDebts: Dept[] = [
  {
    id: 1,
    name: 'John Doe',
    amount: 50,
    dueDate: '2023-07-15',
    status: 'pending',
    phone: '123-456-7890',
    items: ['Milk', 'Bread'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    amount: 30,
    dueDate: '2023-07-10',
    status: 'overdue',
    phone: '098-765-4321',
    items: ['Eggs', 'Cheese'],
  },
  {
    id: 3,
    name: 'Bob Johnson',
    amount: 25,
    dueDate: '2023-07-20',
    status: 'pending',
    phone: '111-222-3333',
    items: ['Apples', 'Bananas'],
  },
]

export default function CustomerDebtDetails() {
  const params = useParams()
  const { id } = params
  const [debt, setDebt] = useState<Dept | null>(null)

  useEffect(() => {
    if (id) {
      const foundDebt: Dept | undefined = initialDebts.find(
        d => d.id === parseInt(id as string)
      )
      if (foundDebt) {
        setDebt(foundDebt)
      } else {
        setDebt({
          id: 0,
          name: 'Unknown',
          amount: 0,
          dueDate: '',
          status: 'unknown',
          phone: '',
          items: [],
        })
      }
    }
  }, [id])

  if (!debt) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Debt Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{debt.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detail</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Amount</TableCell>
                <TableCell>${debt.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Due Date</TableCell>
                <TableCell>
                  {debt.dueDate instanceof Date
                    ? debt.dueDate.toLocaleDateString()
                    : debt.dueDate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <span className={`status-badge status-${debt.status}`}>
                    {debt.status}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{debt.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h2 className="text-xl font-semibold mt-6 mb-2">Purchased Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debt.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Link href="/customer-debts">
          <Button>Back to Customer Debts</Button>
        </Link>
      </div>
    </div>
  )
}
