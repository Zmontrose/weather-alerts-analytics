// scripts/fetch_openfda.mjs
// Fetch recent OpenFDA food enforcement records and save to data/openfda_food.json

const API = 'https://api.fda.gov/food/enforcement.json';
const LIMIT = 100; // max per request
const MAX_RECORDS = 2000; // quick start cap to keep build fast
const START_DATE = '20220101'; // fetch last ~3 years; adjust later if desired

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchPageWithSearch(skip) {
  const params = new URLSearchParams({
    search: `report_date:[${START_DATE}+TO+99999999]`,
    limit: String(LIMIT),
    skip: String(skip)
  });
  const url = `${API}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchPageLatest(skip) {
  const params = new URLSearchParams({
    limit: String(LIMIT),
    skip: String(skip)
  });
  const url = `${API}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  let records = [];

  // Try date-filtered first
  try {
    for (let skip = 0; skip < MAX_RECORDS; skip += LIMIT) {
      const j = await fetchPageWithSearch(skip);
      const batch = j.results || [];
      if (batch.length === 0) break;
      records.push(...batch);
      if (batch.length < LIMIT) break; // last page
      await sleep(200);
    }
  } catch (e) {
    console.error('Date-filtered fetch failed:', e.message);
  }

  // Fallback: latest without search if nothing retrieved
  if (records.length === 0) {
    console.warn('Falling back to latest (no search)');
    try {
      for (let skip = 0; skip < 500; skip += LIMIT) {
        const j = await fetchPageLatest(skip);
        const batch = j.results || [];
        if (batch.length === 0) break;
        records.push(...batch);
        if (batch.length < LIMIT) break;
        await sleep(200);
      }
    } catch (e) {
      console.error('Latest fetch failed:', e.message);
    }
  }

  await import('node:fs/promises').then(async (fs) => {
    await fs.mkdir('data', { recursive: true });
    await fs.writeFile('data/openfda_food.json', JSON.stringify(records, null, 2));
    console.log('Saved', records.length, 'records to data/openfda_food.json');
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
