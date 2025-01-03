import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function SubscriptionPlan() {
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      features: ['Expense Tracking', 'Basic Budgeting', 'Monthly Reports'],
    },
    {
      name: 'Pro',
      price: 19.99,
      features: [
        'All Basic features',
        'Advanced Analytics',
        'Savings Goals',
        'Debt Tracking',
      ],
    },
    {
      name: 'Enterprise',
      price: 49.99,
      features: [
        'All Pro features',
        'Custom Integrations',
        'Dedicated Support',
        'Team Collaboration',
      ],
    },
  ]

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>${plan.price}/month</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardContent className="pt-0">
              <Button className="w-full bg-black text-white hover:bg-black">
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
