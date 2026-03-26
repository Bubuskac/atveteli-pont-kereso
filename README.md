# Átvételi pont térképes választó (React + TS)

## Tech stack

- React + TypeScript (Vite)
- Apollo Client – GraphQL kommunikáció (egyszerű integráció GraphQL API-val és cache-elés.)
- react-leaflet + Leaflet – térkép (könnyű használat, jó ökoszisztéma, ingyenes OSM tile-okkal.)
- Nominatim – egyszerű geokódolás (gyors megoldás a cím → koordináta keresésre.)
- Marker clustering csomag nagy elemszámhoz (10k+ pont esetén a marker-clustering jelentősen javítja a térkép teljesítményét.)

## Futtatás

```bash
npm install
npm run dev