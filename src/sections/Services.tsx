import { PenLine, Handshake } from 'lucide-react'
import { services, collaborations } from '@/data/profile'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-8">
      <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
        <PenLine size={20} className="text-sky-700" /> Academic Services
      </h2>

      <h3 className="mb-2 text-base font-semibold text-slate-800">Editorial Board</h3>
      <ul className="mb-5 list-disc space-y-1 pl-5 text-[15px] text-slate-700">
        {services.editorial.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h3 className="mb-2 text-base font-semibold text-slate-800">Reviewer / PC Member</h3>
      <div className="mb-8 flex flex-wrap gap-1.5">
        {services.reviewer.map((r) => (
          <span key={r} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {r}
          </span>
        ))}
      </div>

      <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
        <Handshake size={20} className="text-sky-700" /> Research Collaboration
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {collaborations.map((c) => (
          <div key={c.name} className="rounded-lg border border-slate-200 px-4 py-3">
            <p className="text-[15px] font-medium text-slate-800">{c.name}</p>
            <p className="text-sm text-slate-500">{c.affiliation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
