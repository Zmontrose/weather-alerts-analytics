#!/usr/bin/env node
// Fetch active weather alerts from NWS API and normalize for site pages.
// API docs: https://www.weather.gov/documentation/services-web-api#/default/alerts_active

import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'data');
const OUT_FILE = path.join(OUT_DIR, 'alerts.json');

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const url = 'https://api.weather.gov/alerts/active?status=actual&message_type=alert&limit=2000';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'WeatherAlertsNow (contact: zachmontrose7551@gmail.com)',
      'Accept': 'application/geo+json'
    }
  });
  if (!res.ok) throw new Error(`NWS fetch failed ${res.status}`);
  const data = await res.json();
  const features = data?.features || [];

  const items = features.map(f => {
    const p = f.properties || {};
    const id = f.id || p.id || p.guid || p['@id'] || Math.random().toString(36).slice(2);
    const area = (p.areaDesc || '').split(';').map(s => s.trim()).filter(Boolean);
    const states = Array.from(new Set(area.map(seg => {
      const m = seg.match(/,\s*([A-Z]{2})$/);
      return m ? m[1] : 'US';
    })));
    return {
      id,
      event: p.event || 'Alert',
      headline: p.headline || p.event || 'Alert',
      severity: p.severity || 'Unknown',
      status: p.status,
      sent: p.sent,
      effective: p.effective,
      expires: p.expires,
      areaDesc: p.areaDesc,
      states,
      instruction: p.instruction || '',
      description: p.description || '',
      uri: p?.id || f.id || '',
      raw: { source: 'api.weather.gov', id: f.id }
    };
  });

  const byState = new Map();
  const byHazard = new Map();
  for (const a of items) {
    for (const s of (a.states.length ? a.states : ['US'])) {
      byState.set(s, (byState.get(s) || 0) + 1);
    }
    byHazard.set(a.event, (byHazard.get(a.event) || 0) + 1);
  }

  const summary = {
    fetchedAt: new Date().toISOString(),
    total: items.length,
    hazards: Array.from(byHazard, ([name, count]) => ({ name, count })).sort((a,b)=>b.count-a.count),
    states: Array.from(byState, ([name, count]) => ({ name, count })).sort((a,b)=>b.count-a.count),
  };

  await fs.writeFile(OUT_FILE, JSON.stringify({ items, summary }, null, 2));
  console.log(`Wrote ${OUT_FILE} with ${items.length} alerts`);
}

main().catch(err => { console.error(err); process.exit(1); });