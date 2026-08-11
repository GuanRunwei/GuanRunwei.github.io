import { Mail, GraduationCap, Github, Globe, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'

export default function Hero() {
  return (
    <section id="about" className="pt-24 pb-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left: avatar + links */}
        <div className="flex shrink-0 flex-col items-center md:w-56">
          <img
            src="https://github.com/GuanRunwei.png"
            alt="Runwei Guan"
            className="h-44 w-44 rounded-full border border-slate-200 object-cover shadow-sm"
          />
          <h1 className="mt-4 text-center font-serif text-2xl font-bold">
            {profile.name}
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            {profile.title}, HKUST(GZ)
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-500">
            <a href={`mailto:${profile.email}`} title="Email" className="hover:text-sky-700">
              <Mail size={18} />
            </a>
            <a href={profile.scholar} target="_blank" rel="noreferrer" title="Google Scholar" className="hover:text-sky-700">
              <GraduationCap size={20} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" className="hover:text-sky-700">
              <Github size={18} />
            </a>
            <a href={profile.googleSite} target="_blank" rel="noreferrer" title="Google Sites" className="hover:text-sky-700">
              <Globe size={18} />
            </a>
          </div>
          <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-slate-50 py-2">
              <div className="text-lg font-bold text-sky-800">{profile.stats.citations}</div>
              <div className="text-[11px] text-slate-500">Citations</div>
            </div>
            <div className="rounded-lg bg-slate-50 py-2">
              <div className="text-lg font-bold text-sky-800">{profile.stats.hIndex}</div>
              <div className="text-[11px] text-slate-500">h-index</div>
            </div>
            <div className="rounded-lg bg-slate-50 py-2">
              <div className="text-lg font-bold text-sky-800">{profile.stats.i10Index}</div>
              <div className="text-[11px] text-slate-500">i10-index</div>
            </div>
          </div>
        </div>

        {/* Right: bio */}
        <div className="min-w-0">
          <ul className="mb-4 space-y-1">
            {profile.affiliations.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-slate-600">
                <MapPin size={14} className="mt-0.5 shrink-0 text-sky-700" />
                {a}
              </li>
            ))}
          </ul>
          {profile.bio.map((p, i) => (
            <p key={i} className="mb-3 text-justify text-[15px] leading-7 text-slate-700">
              {p}
            </p>
          ))}
          <p className="text-[15px] text-slate-700">
            📮 Contact:{' '}
            <a href={`mailto:${profile.email}`} className="text-sky-700 hover:underline">
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
