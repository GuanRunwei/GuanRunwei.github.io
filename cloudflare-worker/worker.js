/**
 * Visitor Counter — Cloudflare Worker
 *
 * Tracks homepage visitors and serves aggregated geo stats for the
 * react-globe.gl visitor globe on GuanRunwei.github.io.
 *
 * Setup (dashboard, no CLI needed):
 *   1. cloudflare.com → Sign up (free) → Workers & Pages → Create Worker
 *   2. Paste this entire file, Deploy
 *   3. Worker Settings → Bindings → Add → KV Namespace:
 *      Variable name = VISITOR_KV, create a new namespace (any name)
 *   4. Copy the worker URL, e.g. https://visitor-counter.<you>.workers.dev
 *   5. In this repo, add .env:  VITE_VISITOR_API=<worker URL>  (no trailing slash)
 *      …and the same variable in GitHub → Settings → Secrets and variables
 *      → Actions → Variables → VITE_VISITOR_API, so CI builds pick it up.
 *
 * Endpoints:
 *   GET /stats?hit=1  → record this visit, then return stats
 *   GET /stats        → return stats without recording
 *   GET /             → health check
 *
 * Response: { "total": 123, "points": [{ city, country, lat, lng, visits }] }
 *
 * Geo data comes from Cloudflare's edge (request.cf) — no IP database,
 * no cookies, no fingerprinting; only coarse city-level aggregates are stored.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const MAX_POINTS = 500 // keep the top-500 cities by visits

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    const url = new URL(request.url)

    if (url.pathname === '/stats') {
      if (url.searchParams.get('hit') === '1') {
        await recordVisit(request, env)
      }
      const stats = await readStats(env)
      return Response.json(stats, { headers: CORS })
    }

    return new Response('visitor counter ok', { headers: CORS })
  },
}

async function recordVisit(request, env) {
  const cf = request.cf || {}
  const country = cf.country || 'Unknown'
  const city = cf.city || country
  const lat = Number.parseFloat(cf.latitude || '0') || 0
  const lng = Number.parseFloat(cf.longitude || '0') || 0
  const key = `${city}|${country}`

  const points = (await env.VISITOR_KV.get('points', 'json')) || {}
  if (points[key]) {
    points[key].visits += 1
  } else {
    points[key] = { city, country, lat, lng, visits: 1 }
  }

  const total = ((await env.VISITOR_KV.get('total', 'json')) || 0) + 1

  // Trim to the top cities so the KV value stays small
  const entries = Object.entries(points)
    .sort((a, b) => b[1].visits - a[1].visits)
    .slice(0, MAX_POINTS)

  await env.VISITOR_KV.put('points', JSON.stringify(Object.fromEntries(entries)))
  await env.VISITOR_KV.put('total', JSON.stringify(total))
}

async function readStats(env) {
  const points = (await env.VISITOR_KV.get('points', 'json')) || {}
  const total = (await env.VISITOR_KV.get('total', 'json')) || 0
  return {
    total,
    points: Object.values(points).sort((a, b) => b.visits - a.visits),
  }
}
