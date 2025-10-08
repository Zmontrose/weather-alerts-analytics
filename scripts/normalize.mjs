// scripts/normalize.mjs
// Normalize OpenFDA records into a flat structure for site generation

import fs from 'node:fs';
import fsp from 'node:fs/promises';

function slugify(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseStates(distribution_pattern) {
  if (!distribution_pattern) return [];
  // split on commas/semicolons and normalize to uppercase abbreviations if present
  return distribution_pattern
    .split(/[,;]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.toUpperCase());
}

async function main() {
  const rawPath = 'data/openfda_food.json';
  if (!fs.existsSync(rawPath)) {
    console.error('Missing', rawPath, '- run npm run fetch first');
    process.exit(1);
  }
  const raw = JSON.parse(await fsp.readFile(rawPath, 'utf8'));

  const recalls = raw.map((r) => {
    const brand = (r.brand_name || 'Unknown').toString().trim();
    const product = (r.product_description || '').toString().trim();
    const category = (r.product_type || 'Food').toString().trim();
    const hazard = (r.reason_for_recall || '').toString().trim();
    const states = parseStates(r.distribution_pattern);
    const recallNum = r.recall_number || r.event_id || '';

    const baseId = `${recallNum}-${brand}-${product.slice(0,50)}`;
    const id = slugify(baseId) || slugify(`${Date.now()}-${Math.random()}`);

    return {
      id,
      brand,
      brandSlug: slugify(brand),
      product,
      category,
      categorySlug: slugify(category),
      hazard,
      states,
      stateSlugs: states.map(slugify),
      recall_class: r.classification || null,
      dates: {
        initiation: r.recall_initiation_date || null,
        report: r.report_date || null
      },
      links: { openfda: r.url || null },
      source: 'openfda'
    };
  });

  await fsp.writeFile('data/recalls.json', JSON.stringify(recalls, null, 2));
  console.log('Normalized', recalls.length, 'records -> data/recalls.json');
}

main().catch((e) => { console.error(e); process.exit(1); });
