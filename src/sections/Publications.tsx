import { useMemo, useState } from 'react'
import { BookOpen, FileText, Code2, ExternalLink, Search, Star } from 'lucide-react'
import { publications, categoryLabels, type Publication } from '@/data/publications'

const tabs = [
  { key: 'selected', label: 'Selected' },
  { key: 'all', label: 'All' },
  ...Object.entries(categoryLabels).map(([key, label]) => ({ key, label })),
] as const

function PubItem({ pub }: { pub: Publication }) {
  return (
    <li className="border-b border-slate-100 py-3 last:border-0">
      <p className="text-[15px] leading-6 font-medium text-slate-900">
        {pub.selected && <Star size={13} className="mr-1 inline text-amber-500" fill="currentColor" />}
        {pub.title}
      </p>
      <p className="mt-0.5 text-sm text-slate-500">{pub.authors}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <span className="rounded bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-800">
          {pub.venue}
        </span>
        <span className="text-xs text-slate-400">{pub.year}</span>
        {pub.citations !== undefined && pub.citations > 0 && (
          <span className="text-xs text-slate-500">Cited by {pub.citations}</span>
        )}
        {pub.link && (
          <a href={pub.link} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-sky-700 hover:underline">
            <FileText size={12} /> Paper
          </a>
        )}
        {pub.code && (
          <a href={pub.code} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-sky-700 hover:underline">
            <Code2 size={12} /> Code
          </a>
        )}
        {pub.project && (
          <a href={pub.project} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-sky-700 hover:underline">
            <ExternalLink size={12} /> Project
          </a>
        )}
      </div>
    </li>
  )
}

export default function Publications() {
  const [tab, setTab] = useState<string>('selected')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = publications
    if (tab === 'selected') list = list.filter((p) => p.selected)
    else if (tab !== 'all') list = list.filter((p) => p.category === tab)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.venue.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => b.year - a.year || (b.citations ?? 0) - (a.citations ?? 0))
  }, [tab, query])

  const byYear = useMemo(() => {
    const m = new Map<number, Publication[]>()
    for (const p of filtered) {
      const arr = m.get(p.year) ?? []
      arr.push(p)
      m.set(p.year, arr)
    }
    return [...m.entries()].sort((a, b) => b[0] - a[0])
  }, [filtered])

  return (
    <section id="publications" className="scroll-mt-20 py-8">
      <h2 className="mb-1 flex items-center gap-2 font-serif text-2xl font-bold">
        <BookOpen size={20} className="text-sky-700" /> Publications
      </h2>
      <p className="mb-4 text-sm text-slate-500">
        * denotes equal contribution. Full list on{' '}
        <a href="https://scholar.google.com.hk/citations?hl=zh-CN&user=Fjo72tUAAAAJ"
          target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
          Google Scholar
        </a>.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              tab === t.key
                ? 'bg-sky-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={14} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title / venue / author"
            className="w-56 rounded-full border border-slate-200 py-1.5 pr-3 pl-8 text-sm outline-none focus:border-sky-400"
          />
        </div>
      </div>

      <p className="mb-2 text-xs text-slate-400">{filtered.length} publications</p>

      {byYear.map(([year, pubs]) => (
        <div key={year} className="mb-4">
          <h3 className="sticky top-14 z-10 -mx-2 bg-white/95 px-2 py-1 font-serif text-lg font-bold text-sky-900 backdrop-blur-sm">
            {year}
          </h3>
          <ul>
            {pubs.map((p) => (
              <PubItem key={p.title} pub={p} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
