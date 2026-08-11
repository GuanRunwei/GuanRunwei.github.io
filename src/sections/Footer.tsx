import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {profile.name} · Last updated: Aug 2026
      </p>
      <p className="mt-1">
        Built with React + Vite · Visitor globe powered by{' '}
        <a href="https://globe.gl" target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
          globe.gl
        </a>
      </p>
    </footer>
  )
}
