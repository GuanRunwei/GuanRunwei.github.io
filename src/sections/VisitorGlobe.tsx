import { Globe2 } from 'lucide-react'

export default function VisitorGlobe() {
  return (
    <section id="visitors" className="scroll-mt-20 py-8">
      <h2 className="mb-1 flex items-center gap-2 font-serif text-2xl font-bold">
        <Globe2 size={20} className="text-sky-700" /> Visitor Map
      </h2>
      <p className="mb-4 text-sm text-slate-500">
        Real-time visitor globe powered by{' '}
        <a
          href="https://www.mapmyvisitors.com"
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 hover:underline"
        >
          MapMyVisitors
        </a>
        , tracking every visit since deployment. Click the globe for detailed
        country / city statistics.
      </p>

      {/* The widget script validates the registered domain, so it is served
          from a real same-origin page (public/visitor-globe.html) instead of
          an about:srcdoc iframe. */}
      <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 py-4">
        <iframe
          title="Live visitor globe"
          src="/visitor-globe.html"
          className="h-[360px] w-full max-w-[600px]"
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </section>
  )
}
