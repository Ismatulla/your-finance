'use client'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { usePathname } from 'next/navigation'
import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '../ui/button'
import Image from 'next/image'
import { UserType } from '@/lib/types/types'
import Link from 'next/link'
const Header = () => {
  const pathname = usePathname()
  const showHeader = pathname !== '/auth/login' && pathname !== '/auth/register'

  // const router = useRouter()
  const [hasShadow, setHasShadow] = useState<boolean>(false)
  const [isMountend, setIsMounted] = useState(false)
  const [userInfo, setUserInfo] = useState<UserType>({
    id: '',
    given_name: '',
    picture: '',
  })

  const handleData = async () => {
    try {
      const response = await fetch('/api/getUserSession')
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data = await response.json()
      setUserInfo(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasShadow(true)
      } else {
        setHasShadow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    handleData()
  }, [])

  if (!isMountend) {
    return null
  }

  return showHeader ? (
    <header
      className={` sticky z-10 transition-all duration-100 bg-transparent top-0 left-0 right-0  px-10 md:px-24 ${
        hasShadow ? 'shadow-md bg-white' : ''
      } `}
    >
      <div className="flex justify-between items-center w-full">
        {' '}
        <Link href="/">
          <Image
            src="/images/finance-logo.svg"
            alt="logo"
            width={80}
            height={80}
          />
        </Link>
        {userInfo === null ? (
          <Button asChild variant="ghost">
            <LoginLink>Login</LoginLink>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className=" outline-none text-gray-600 hover:text-gray-900">
              <Avatar>
                <AvatarImage src={userInfo?.picture} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white shadow-lg rounded-lg ">
              <DropdownMenuItem
                asChild
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <LogoutLink postLogoutRedirectURL="/"> Logout</LogoutLink>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <Link href="dashboard"> Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <Link href="/subscription"> Subscription</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>{' '}
    </header>
  ) : null
}

export default Header
