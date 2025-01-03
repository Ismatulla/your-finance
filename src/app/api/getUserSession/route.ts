import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
//getAccessTokenRaw
export async function GET() {
  const { getUser } = getKindeServerSession()
  try {
    const user = await getUser()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: `failed to fetch data: ${error}` },
      { status: 500 }
    )
  }
}
