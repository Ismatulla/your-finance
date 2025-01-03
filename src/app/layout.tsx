import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'
import { AuthProvider } from '../../AuthProvider'
export const metadata = {
  title: 'My financial status',
  description: 'Control over your finance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />

            {/* Open Graph meta tags */}
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta
              property="og:image"
              content="https://yourwebsite.com/path/to/your-image.jpg"
            />
            <meta property="og:url" content="https://yourwebsite.com" />

            {/* Twitter Card meta tags */}
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta
              name="twitter:image"
              content="https://yourwebsite.com/path/to/your-image.jpg"
            />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
