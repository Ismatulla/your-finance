'use client'
import React from 'react'
import Card from './Card'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const datas = [
  {
    title: 'Expense Tracking',
    content:
      'Easily monitor where your money goes with detailed categorization',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pie-chart h-8 w-8 text-blue-600"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    ),
    url: 'expense-tracking',
  },
  {
    title: 'Cost Management',
    content: 'Get insights on your spending habits and find areas to save.',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-wallet h-8 w-8 text-blue-600"
      >
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
      </svg>
    ),
    url: 'cost-management',
  },
  {
    title: 'Savings Plans',
    content: 'Set and track savings goals for your future endeavors.',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-piggy-bank h-8 w-8 text-blue-600"
      >
        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"></path>
        <path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
        <path d="M16 11h0"></path>
      </svg>
    ),
    url: 'savings-plans',
  },

  {
    title: 'Borrowing Overview',
    content: 'Keep tabs on your loans and credit to maintain financial health.',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-credit-card h-8 w-8 text-blue-600"
      >
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
      </svg>
    ),
  },
]
const Features = () => {
  const { isAuthenticated } = useKindeBrowserClient()
  console.log(isAuthenticated)
  return (
    <section className="py-20 bg-white mt-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">
          Poweful Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {datas.map((data, idx) => (
            <Card
              key={idx}
              title={data.title}
              content={data.content}
              logo={data.logo}
              isAuthenticated={isAuthenticated}
              url={data.url}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
