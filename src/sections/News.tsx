import { Megaphone } from 'lucide-react'
import { news } from '@/data/profile'

export default function News() {
  return (
    <section id="news" className="scroll-mt-20 py-8">
      <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
        <Megaphone size={20} className="text-sky-700" /> News
      </h2>
      <ul className="max-h-72 space-y-2 overflow-y-auto pr-2">
        {news.map((n, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-6">
            <span className="shrink-0 font-mono text-sm font-semibold text-sky-800">
              [{n.date}]
            </span>
            <span className="text-slate-700">{n.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
