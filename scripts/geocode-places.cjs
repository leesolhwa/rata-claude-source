const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'data', 'map-places.json');
const output = path.join(root, 'dist', 'map-data.js');
const places = JSON.parse(fs.readFileSync(source, 'utf8'));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function geocode(address) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', address);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '3');
  url.searchParams.set('countrycodes', 'kr');
  const res = await fetch(url, {headers: {'User-Agent': 'RATA portfolio map research (educational prototype)', 'Accept-Language': 'ko'}});
  if (!res.ok) throw new Error(`Geocode HTTP ${res.status}`);
  return res.json();
}

(async () => {
  for (const place of places) {
    if (Number.isFinite(place.lat) && Number.isFinite(place.lng)) continue;
    const hits = await geocode(place.address);
    if (hits.length) {
      place.lat = Number(hits[0].lat);
      place.lng = Number(hits[0].lon);
      place.pinAccuracy = 'address';
      place.geocodeLabel = hits[0].display_name;
    } else {
      place.pinAccuracy = 'unavailable';
    }
    console.log(`${place.name}: ${place.lat ?? 'NO PIN'}, ${place.lng ?? ''}`);
    await wait(1200);
  }
  fs.writeFileSync(source, JSON.stringify(places, null, 2) + '\n');
  fs.writeFileSync(output, `window.RATA_MAP_SHOPS = ${JSON.stringify(places)};\n`);
})().catch(error => {console.error(error); process.exitCode = 1});
