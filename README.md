# Viet Nam in Numbers — National Statistics Site

[![Make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/tpl11295/makefun-natstats-01/rank.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/tpl11295/makefun-natstats-01/reward.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)

An original, working national statistics site for **Viet Nam** — built for the
[Make the best national statistics site](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
competition on make.fun.

## What it is

A country of 101 million people that grew 7.1% in 2024, exported $405 billion
of goods, and doubled its economy in nine years. This site tells that story in
five pages of real, sourced figures:

- **Overview** — six headline indicators, GDP growth and population charts, and the three numbers that explain the decade.
- **People** — a 2024 population pyramid, a decade of growth, and a searchable, filterable, sortable table of the 20 largest provinces and cities.
- **Economy** — a year-in-focus panel (2015–2024), GDP in dollars with a bar/line toggle, exports vs imports, and inflation.
- **Living standards** — poverty falling from 9.2% to 5.7%, school enrolment, health, and the urban–rural income gap.
- **Data & sources** — every headline figure and the full decade in one table, with sources and method notes.

Every figure names its year and its source (General Statistics Office of Viet Nam; World Bank). Every control works: the year selector, the region filter, the province search and sort, and the chart-type toggle.

## Run it

No build step, no network requests — plain static files under `app/`:

```sh
node serve.ts
# open http://localhost:8080
```

`main.ts` (Node 22) hands the site in: it copies `app/` and `screenshots/` to the
output directory and writes `dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Screenshots

Real renders of the site's own code, listed in `shots.json`: overview, economy,
population (desktop, 1280×800) and overview on a phone (390×844).

## Design

Warm editorial look — cream paper, deep teal ink, flag-red accent — with
hand-rolled SVG charts (no libraries, no CDN). Original design, text and
figures; not affiliated with the GSO or the World Bank.
