import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { Globe2, Users, MapPinned, TrendingUp } from 'lucide-react'
import { visitorPoints as fallbackPoints, type VisitorPoint } from '@/data/profile'

// Optional: set VITE_VISITOR_API in .env to an endpoint that returns
// [{ city, country, lat, lng, visits }] — the globe will use live data.
const VISITOR_API = import.meta.env.VITE_VISITOR_API as string | undefined

export default function VisitorGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null)
  const [size, setSize] = useState({ w: 480, h: 480 })
  const [points, setPoints] = useState<VisitorPoint[]>(fallbackPoints)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!VISITOR_API) return
    fetch(VISITOR_API)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: VisitorPoint[]) => {
        if (Array.isArray(data) && data.length) {
          setPoints(data)
          setLive(true)
        }
      })
      .catch(() => {/* keep fallback demo data */})
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth
      setSize({ w, h: Math.min(w, 520) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const g = globeRef.current
    if (!g) return
    g.controls().autoRotate = true
    g.controls().autoRotateSpeed = 0.6
    g.controls().enableZoom = true
    g.pointOfView({ lat: 25, lng: 112, altitude: 2.1 })
  }, [])

  const stats = useMemo(() => {
    const total = points.reduce((s, p) => s + p.visits, 0)
    const countries = new Set(points.map((p) => p.country)).size
    const top = [...points].sort((a, b) => b.visits - a.visits).slice(0, 6)
    return { total, countries, cities: points.length, top }
  }, [points])

  const maxVisits = stats.top[0]?.visits ?? 1

  return (
    <section id="visitors" className="scroll-mt-20 py-8">
      <h2 className="mb-1 flex items-center gap-2 font-serif text-2xl font-bold">
        <Globe2 size={20} className="text-sky-700" /> Visitor Map
      </h2>
      <p className="mb-4 text-sm text-slate-500">
        {live
          ? 'Live visitor locations and page-view counts.'
          : 'Demo data — connect an analytics endpoint (VITE_VISITOR_API) or a ClustrMaps widget after deployment to show live visitor stats.'}
      </p>

      <div className="grid items-center gap-6 md:grid-cols-2">
        <div ref={containerRef} className="overflow-hidden rounded-xl bg-slate-900">
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(2,6,23,1)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            showAtmosphere
            atmosphereColor="#38bdf8"
            atmosphereAltitude={0.18}
            pointsData={points}
            pointLat={(d: object) => (d as VisitorPoint).lat}
            pointLng={(d: object) => (d as VisitorPoint).lng}
            pointColor={() => '#f59e0b'}
            pointAltitude={(d: object) =>
              0.05 + (0.3 * (d as VisitorPoint).visits) / maxVisits
            }
            pointRadius={(d: object) =>
              0.25 + (0.9 * (d as VisitorPoint).visits) / maxVisits
            }
            pointLabel={(d: object) => {
              const p = d as VisitorPoint
              return `<div style="font-family:sans-serif"><b>${p.city}</b>, ${p.country}<br/>${p.visits} visits</div>`
            }}
            labelsData={stats.top}
            labelLat={(d: object) => (d as VisitorPoint).lat}
            labelLng={(d: object) => (d as VisitorPoint).lng}
            labelText={(d: object) => (d as VisitorPoint).city}
            labelSize={1.1}
            labelDotRadius={0.3}
            labelColor={() => 'rgba(226,232,240,0.9)'}
            labelResolution={2}
          />
        </div>

        <div>
          <div className="mb-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-slate-200 py-3">
              <Users size={16} className="mx-auto mb-1 text-sky-700" />
              <div className="text-xl font-bold text-slate-900">{stats.total.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Total Visits</div>
            </div>
            <div className="rounded-lg border border-slate-200 py-3">
              <MapPinned size={16} className="mx-auto mb-1 text-sky-700" />
              <div className="text-xl font-bold text-slate-900">{stats.countries}</div>
              <div className="text-xs text-slate-500">Countries</div>
            </div>
            <div className="rounded-lg border border-slate-200 py-3">
              <TrendingUp size={16} className="mx-auto mb-1 text-sky-700" />
              <div className="text-xl font-bold text-slate-900">{stats.cities}</div>
              <div className="text-xs text-slate-500">Cities</div>
            </div>
          </div>

          <h3 className="mb-2 text-sm font-semibold text-slate-700">Top Locations</h3>
          <ul className="space-y-2">
            {stats.top.map((p) => (
              <li key={p.city} className="text-sm">
                <div className="mb-0.5 flex justify-between">
                  <span className="text-slate-700">
                    {p.city}, {p.country}
                  </span>
                  <span className="font-mono text-slate-500">{p.visits}</span>
                </div>
                <div className="h-1.5 w-full rounded bg-slate-100">
                  <div
                    className="h-1.5 rounded bg-sky-600"
                    style={{ width: `${(100 * p.visits) / maxVisits}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
