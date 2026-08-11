import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import News from '@/sections/News'
import Research from '@/sections/Research'
import Publications from '@/sections/Publications'
import Services from '@/sections/Services'
import VisitorGlobe from '@/sections/VisitorGlobe'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <hr className="border-slate-200" />
        <News />
        <hr className="border-slate-200" />
        <Research />
        <hr className="border-slate-200" />
        <Publications />
        <hr className="border-slate-200" />
        <Services />
        <hr className="border-slate-200" />
        <VisitorGlobe />
      </main>
      <Footer />
    </div>
  )
}
