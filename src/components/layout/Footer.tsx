'use client'
import { usePathname } from 'next/navigation'
const Footer = () => {
  const pathname = usePathname()
  const showFooter = pathname !== '/auth/login' && pathname !== '/auth/register'
  return showFooter ? (
    <footer className="py-6 bg-gray-900 text-white">
      <div className="contianer px-4 text-center">
        <p>© 2023 My Finance. All rights reserved.</p>
      </div>
    </footer>
  ) : null
}

export default Footer
