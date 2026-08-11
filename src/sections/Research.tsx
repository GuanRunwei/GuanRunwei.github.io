import { Compass, FolderKanban } from 'lucide-react'
import { researchInterests, projects } from '@/data/profile'

export default function Research() {
  return (
    <section id="research" className="scroll-mt-20 py-8">
      <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
        <Compass size={20} className="text-sky-700" /> Research Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        {researchInterests.map((r) => (
          <span
            key={r}
            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-900"
          >
            {r}
          </span>
        ))}
      </div>

      <h3 className="mt-8 mb-3 flex items-center gap-2 font-serif text-xl font-bold">
        <FolderKanban size={18} className="text-sky-700" /> Ongoing Projects
      </h3>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.title} className="rounded-lg border border-slate-200 p-4">
            <p className="text-[15px] font-medium text-slate-800">{p.title}</p>
            <p className="mt-1 text-sm text-slate-500">
              {p.org} · <span className="font-medium text-sky-800">{p.role}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
