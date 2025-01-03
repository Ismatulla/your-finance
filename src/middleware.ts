import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(_req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()
  if (!isAuth) {
    return NextResponse.redirect(new URL('http://localhost:3000'))
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/expense-tracking/:path*',
    '/cost-management/:path*',
    '/savings-plans/:path*',
    '/borrowing-overview/:path*',
    '/customer-debts/:path*',
  ],
}
