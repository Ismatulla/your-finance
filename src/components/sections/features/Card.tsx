'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
type Props = {
  title: string
  content: string
  logo: ReactNode
  isAuthenticated: boolean | null
  url?: string
}
const Card = ({ title, content, logo, isAuthenticated, url }: Props) => {
  const router = useRouter()
  const handleNavigate = () => {
    if (isAuthenticated && !title.includes('Borrowing')) {
      router.push(`/${url}`)
    } else {
      router.push('/')
    }
  }
  return (
    <div
      onClick={handleNavigate}
      className="rounded-lg border bg-card text-card-foreground shadow-sm flex-flex-col intems-center text-centerp-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6 ">
        {logo}
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )
}

export default Card
