// Viet Nam in Numbers — the hand-in program (Node 22, standard library only).
//
// The site itself is plain static files under app/ (index.html, CSS and ES
// modules, no build step, nothing fetched over the network). This program
// hands it in: it copies app/ and screenshots/ from beside this file into
// the output directory and writes dossier.json there, the summary the
// judge reads (screenshots, first-load files and bytes, and the source
// outline), using the vendored make.fun library.
//
// vendor/makefun-frontend.ts is the kit's own file, left exactly as shipped:
// the scorer requires dossier.json to be byte for byte what its own copy
// of that library writes.
//
// Run locally to check the hand-in:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The grader runs it with /output as the target; outside the grader the
// MAKEFUN_OUTPUT_DIR variable stands in for that directory.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });

const shots = join(here, 'screenshots');
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shots)) cpSync(shots, join(out, 'screenshots'), { recursive: true });

// The scorer's caps (from the kit's reference gate): at most 4 screenshots
// and none over 256 KiB; app/ under 993 files and 16 MiB. The text cap
// shapes how much source text the dossier carries.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(`Viet Nam in Numbers handed in to ${out}`);
