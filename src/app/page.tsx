import CTA from '@/components/sections/cta/CTA'
import Features from '@/components/sections/features/Features'
import Hero from '@/components/ui/hero'
export default function Home() {
  return (
    <div className="min-h-screen  ">
      <Hero />
      <Features />
      <CTA />
    </div>
  )
}
