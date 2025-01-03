'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'

const Hero = () => {
  const { isAuthenticated } = useKindeBrowserClient()

  return (
    <div className=" text-center mt-24 ">
      <h2 className="text-5xl font-bold text-gray-900 mb-4">
        Take Control of Your Finance
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Track expenses, manage costs, plan savings, and monitor borrowings - all
        in one place.
      </p>

      <Button className="bg-black rounded hover:bg-slate-800 text-white hover:text-white mt-4">
        {isAuthenticated ? (
          <Link href="/dashboard">Your dashboard</Link>
        ) : (
          <LoginLink>Get Started</LoginLink>
        )}{' '}
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Hero
