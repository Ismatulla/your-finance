'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CTA = () => {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/subscription')
  }
  return (
    <div className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Ready to Master Your Finances ?</h2>
        <p className="text-xl mb-8">
          Join thousands of users who have transformed their financial lives
        </p>
        <Button
          onClick={handleNavigate}
          className="bg-white rounded hover:bg-white-800 text-blue-500 hover:text-blue-600 mt-4"
        >
          Subscribe For More
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default CTA
