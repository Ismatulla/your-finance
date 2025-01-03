'use client'

import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import Link from 'next/link'
import { Dept, SingleDept } from '@/lib/definitions'

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

export default function CustomerDebts() {
  const [debts, setDebts] = useState<Dept[]>(initialDebts)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const [newDebt, setNewDebt] = useState<SingleDept>({
    name: '',
    amount: 0,
    dueDate: new Date(),
    phone: '',
    items: [''],
  })

  const filteredDebts = debts.filter(
    debt =>
      debt.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || debt.status === statusFilter)
  )

  const handleAddDebt = () => {
    const newId = Math.max(...debts.map(d => d.id)) + 1
    const newDebtEntry = {
      ...newDebt,
      id: newId,
      amount: newDebt.amount,
      dueDate: format(newDebt.dueDate, 'yyyy-MM-dd'),
      status: 'pending',
      items: newDebt.items.map(item => item.trim()),
    }
    setDebts([...debts, newDebtEntry])
    setNewDebt({
      name: '',
      amount: 0,
      dueDate: new Date(),
      phone: '',
      items: [''],
    })
  }
  console.log(newDebt.dueDate)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Debts</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-black text-white">
              Add New Debt
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Customer Debt</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="text-right ">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDebt.name}
                  onChange={e =>
                    setNewDebt({ ...newDebt, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newDebt.amount}
                  onChange={e =>
                    setNewDebt({ ...newDebt, amount: +e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <div className="w-full">
                  <Calendar
                    mode="single"
                    selected={newDebt.dueDate}
                    onSelect={date =>
                      setNewDebt({ ...newDebt, dueDate: date || new Date() })
                    }
                    className="rounded-md border  "
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newDebt.phone}
                  onChange={e =>
                    setNewDebt({ ...newDebt, phone: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div>
                <Label htmlFor="items" className="text-right">
                  Items
                </Label>
                <Input
                  id="items"
                  value={newDebt.items}
                  onChange={e =>
                    setNewDebt({ ...newDebt, items: [e.target.value] })
                  }
                  className="col-span-3"
                  placeholder="Comma-separated list of items"
                />
              </div>
            </div>
            <Button
              onClick={handleAddDebt}
              className="bg-black hover:bg-black text-white"
            >
              Add Debt
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Debts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDebts.map(debt => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.name}</TableCell>
                  <TableCell>${debt.amount}</TableCell>
                  <TableCell>
                    {debt.dueDate instanceof Date
                      ? debt.dueDate.toLocaleDateString()
                      : debt.dueDate}
                  </TableCell>
                  <TableCell>
                    <span className={`status-badge status-${debt.status}`}>
                      {debt.status}
                    </span>
                  </TableCell>
                  <TableCell>{debt.phone}</TableCell>
                  <TableCell>
                    <Link
                      href={`/customer-debts/${debt.id}`}
                      className="font-semibold cursor-pointer"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
