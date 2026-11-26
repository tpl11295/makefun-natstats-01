// Page views for Vietnam in Numbers. Each view returns an HTML string
// for #app; main.js owns the router and the control state.

import { META, GDP_GROWTH, GDP_USD, TRADE, CPI, POPULATION, PYRAMID, PROVINCES, INDICATORS, LIVING, SOURCES } from './data.js';
import { barChart, lineChart, groupedBars, pyramid, hbars } from './charts.js';

const fmt1 = (v) => v.toFixed(1);
const fmtInt = (v) => Math.round(v).toLocaleString('en-US');

function kpiCard(ind) {
  return `<article class="kpi"><div class="kpi-value">${ind.value}</div><div class="kpi-label">${ind.label}</div><div class="kpi-note">${ind.note} · ${ind.year}</div></article>`;
}

function pageHead(title, standfirst) {
  return `<div class="page-head"><h1>${title}</h1><p class="standfirst">${standfirst}</p></div>`;
}

function section(title, body, note = '') {
  return `<section class="card"><h2>${title}</h2>${body}${note ? `<p class="card-note">${note}</p>` : ''}</section>`;
}

// ---- Overview -------------------------------------------------------------
export function overview() {
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value }));
  const pop = POPULATION.map((d) => ({ label: String(d.year), value: d.value }));
  return `
  <div class="hero">
    <p class="eyebrow">General Statistics Office · World Bank · 2015–2024</p>
    <h1>Viet Nam in numbers</h1>
    <p class="hero-lede">A country of 101 million people that grew 7.1% in 2024, exported
    $405 billion of goods, and doubled its economy in nine years. This site
    tells that story in five pages of real, sourced figures.</p>
    <nav class="hero-links">
      <a href="#/population">People →</a>
      <a href="#/economy">Economy →</a>
      <a href="#/living">Living standards →</a>
      <a href="#/sources">Data &amp; sources →</a>
    </nav>
  </div>
  <div class="kpi-grid">
    ${kpiCard(INDICATORS.population)}${kpiCard(INDICATORS.gdp)}${kpiCard(INDICATORS.gdpPerCapita)}
    ${kpiCard(INDICATORS.exports)}${kpiCard(INDICATORS.fdi)}${kpiCard(INDICATORS.inflation)}
  </div>
  <div class="two-col">
    ${section('Growth, year by year', barChart(growth, { format: (v) => v.toFixed(1) + '%', highlight: 9, yLabel: 'Real GDP growth, %' }),
      'Real GDP growth, 2015–2024. The two slow years are the pandemic; 2022 bounced back at 8.0%. Source: GSO.')}
    ${section('A growing population', lineChart(pop, { format: (v) => v.toFixed(1) + 'm', yLabel: 'Population, millions' }),
      'Mid-year population, 2015–2024. Viet Nam passed 100 million people in 2023. Source: GSO.')}
  </div>
  <section class="card story">
    <h2>Three numbers that explain the decade</h2>
    <ol class="story-list">
      <li><strong>2×</strong> — GDP in dollars doubled from $233bn (2015) to $476bn (2024).</li>
      <li><strong>2.5×</strong> — Exports rose from $162bn to $406bn over the same nine years.</li>
      <li><strong>32.8 years</strong> — the median age: a young workforce, still growing.</li>
    </ol>
    <p class="card-note">Every figure on this site names its year and its source. Start with the
    <a href="#/population">people</a>, then the <a href="#/economy">economy</a>.</p>
  </section>`;
}

// ---- Population -----------------------------------------------------------
const REGIONS = ['All regions', ...new Set(PROVINCES.map((p) => p.region))];

export function population(state) {
  const q = (state.search || '').toLowerCase();
  let rows = PROVINCES.filter((p) => (state.region === 'All regions' || p.region === state.region) &&
    (!q || p.name.toLowerCase().includes(q)));
  const key = state.sort || 'pop';
  rows = [...rows].sort((a, b) => key === 'name' ? a.name.localeCompare(b.name) : b[key] - a[key]);
  const tableRows = rows.map((p) => `<tr><td>${p.name}</td><td>${p.region}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.area.toLocaleString('en-US')}</td><td class="num">${p.urban.toFixed(1)}%</td></tr>`).join('');
  return `
  ${pageHead('People', '101.3 million people in 2024, a median age of 32.8, and two cities — Ho Chi Minh City and Ha Noi — holding nearly one in five Vietnamese.')}
  <div class="kpi-grid">
    ${kpiCard(INDICATORS.population)}${kpiCard(INDICATORS.medianAge)}${kpiCard(INDICATORS.lifeExpectancy)}${kpiCard(INDICATORS.literacy)}
  </div>
  <div class="two-col">
    ${section('Who lives here: the 2024 pyramid', pyramid(PYRAMID),
      'Population by five-year age band, millions. The bulge at 25–39 is the working-age core; the base is narrowing as births fall. Source: GSO age structure, 2024.')}
    ${section('A decade of growth', lineChart(POPULATION.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(1) + 'm' }),
      'Population grew by about 9 million between 2015 and 2024, roughly 1% a year. Source: GSO.')}
  </div>
  ${section('Provinces &amp; cities — the 20 largest',
    `<div class="controls">
      <label>Region <select id="region-filter">${REGIONS.map((r) => `<option${r === state.region ? ' selected' : ''}>${r}</option>`).join('')}</select></label>
      <label>Search <input id="province-search" type="search" placeholder="e.g. Da Nang" value="${(state.search || '').replace(/"/g, '&quot;')}"></label>
      <label>Sort by <select id="province-sort">
        <option value="pop"${key === 'pop' ? ' selected' : ''}>Population</option>
        <option value="area"${key === 'area' ? ' selected' : ''}>Area</option>
        <option value="urban"${key === 'urban' ? ' selected' : ''}>Urban share</option>
        <option value="name"${key === 'name' ? ' selected' : ''}>Name A–Z</option>
      </select></label>
    </div>
    <p class="result-count">${rows.length} of 20 shown · 63 provinces &amp; cities in total (2024)</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Province / city</th><th>Region</th><th class="num">People (m)</th><th class="num">Area (km²)</th><th class="num">Urban</th></tr></thead>
      <tbody>${tableRows || '<tr><td colspan="5">No province matches that search.</td></tr>'}</tbody>
    </table></div>`,
    'Population and area, 2024; urban share is the share of residents in urban areas. In 2025 the 63 units were merged into 34 — this table keeps the 2024 map the figures were published on. Source: GSO.')}
  `;
}

// ---- Economy --------------------------------------------------------------
export function economy(state) {
  const year = state.year || 2024;
  const g = GDP_GROWTH.find((d) => d.year === year);
  const u = GDP_USD.find((d) => d.year === year);
  const t = TRADE.find((d) => d.year === year);
  const c = CPI.find((d) => d.year === year);
  const surplus = (t.exports - t.imports).toFixed(1);
  const chartType = state.chart || 'bar';
  const gdpChart = chartType === 'line'
    ? lineChart(GDP_USD.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => '$' + Math.round(v) + 'bn' })
    : barChart(GDP_USD.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => '$' + Math.round(v) + 'bn', highlight: GDP_USD.findIndex((d) => d.year === year) });
  return `
  ${pageHead('Economy', 'GDP of $476 billion in 2024, growing 7.1% — the fastest of the large economies in Southeast Asia that year. Exports of $405 billion made Viet Nam one of the world’s top 20 exporters.')}
  <div class="kpi-grid">
    ${kpiCard(INDICATORS.gdp)}${kpiCard(INDICATORS.gdpPerCapita)}${kpiCard(INDICATORS.exports)}${kpiCard(INDICATORS.fdi)}${kpiCard(INDICATORS.inflation)}${kpiCard(INDICATORS.unemployment)}
  </div>
  ${section('Year in focus',
    `<div class="controls">
      <label>Choose a year <select id="year-select">${META.years.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}</select></label>
      <span class="year-hint">Change the year — the whole panel below updates.</span>
    </div>
    <div class="year-panel">
      <div><div class="year-big">${year}</div><div class="year-sub">Year in focus</div></div>
      <div><div class="year-stat">${g.value.toFixed(2)}%</div><div class="year-sub">Real GDP growth</div></div>
      <div><div class="year-stat">$${u.value.toFixed(1)}bn</div><div class="year-sub">GDP, current dollars</div></div>
      <div><div class="year-stat">$${t.exports.toFixed(1)}bn</div><div class="year-sub">Exports</div></div>
      <div><div class="year-stat">$${t.imports.toFixed(1)}bn</div><div class="year-sub">Imports</div></div>
      <div><div class="year-stat">${surplus >= 0 ? '+' : ''}$${surplus}bn</div><div class="year-sub">Trade balance</div></div>
      <div><div class="year-stat">${c.value.toFixed(2)}%</div><div class="year-sub">Inflation (CPI)</div></div>
    </div>`,
    'All figures for the selected year. Sources: GSO (growth, trade, CPI), World Bank (GDP in dollars).')}
  <div class="two-col">
    ${section('GDP in dollars, 2015–2024',
      `<div class="controls"><span class="toggle-label">Chart:</span>
        <button class="toggle${chartType === 'bar' ? ' active' : ''}" data-chart="bar" type="button">Bars</button>
        <button class="toggle${chartType === 'line' ? ' active' : ''}" data-chart="line" type="button">Line</button></div>
      ${gdpChart}`,
      'GDP in current US dollars. It doubled in nine years — from $233bn in 2015 to $476bn in 2024. Source: World Bank.')}
    ${section('Growth: the pandemic dip and the rebound', barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(1) + '%', highlight: 9 }),
      'Real GDP growth, % per year. Growth never went negative — 2.9% in 2020 and 2.6% in 2021 — then rebounded to 8.0% in 2022. Source: GSO.')}
  </div>
  ${section('Trade: exports vs imports', groupedBars(TRADE.map((d) => ({ label: String(d.year), a: d.exports, b: d.imports })), { format: (v) => '$' + Math.round(v) + 'bn', legend: ['Exports', 'Imports'] }),
    'Merchandise trade, $bn. Viet Nam has run a surplus every year since 2016; the 2024 surplus was $24.7bn. Source: GSO.')}
  ${section('Prices: inflation stayed tame', lineChart(CPI.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(1) + '%' }),
    'Consumer price inflation, % per year. It never topped 4% in the decade — 3.63% in 2024, inside the official 4–4.5% target. Source: GSO.')}
  `;
}

// ---- Living ---------------------------------------------------------------
export function living() {
  return `
  ${pageHead('Living standards', 'Life expectancy of 74.7 years, literacy above 95%, and a poverty rate that fell from 9.2% to 5.7% in four years. The gains are real — and uneven between city and countryside.')}
  <div class="kpi-grid">
    ${kpiCard(INDICATORS.lifeExpectancy)}${kpiCard(INDICATORS.literacy)}${kpiCard(INDICATORS.internet)}${kpiCard(INDICATORS.electricity)}
  </div>
  <div class="two-col">
    ${section('Poverty is falling fast', lineChart(LIVING.poverty.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(1) + '%' }),
      'Multidimensional poverty rate, %. From 9.2% in 2019 to 5.7% in 2023. Source: GSO.')}
    ${section('School enrolment, net rate', hbars(LIVING.schoolEnrolment, { format: (v) => v.toFixed(1) + '%' }),
      'Net enrolment by level, latest year. Nearly every child finishes primary school; the drop comes at upper secondary. Source: GSO.')}
  </div>
  <div class="two-col">
    ${section('Health', `<table class="plain"><tbody>${LIVING.health.map((h) => `<tr><td>${h.label}</td><td class="num"><strong>${h.value}</strong>${h.unit || ''}</td><td class="num">${h.year}</td></tr>`).join('')}</tbody></table>`,
      'Health insurance now covers 94% of the population. Source: GSO.')}
    ${section('Income', `<table class="plain"><tbody>${LIVING.income.map((h) => `<tr><td>${h.label}</td><td class="num"><strong>${h.value}</strong></td><td class="num">${h.year}</td></tr>`).join('')}</tbody></table>`,
      'Average monthly income per person, 2024. Urban incomes run about two-thirds higher than rural ones. Source: GSO.')}
  </div>
  <section class="card story">
    <h2>The gap to watch</h2>
    <p>Urban residents earn on average 6.70 million VND a month; rural residents 4.03 million.
    Closing that gap — not just raising the average — is the story of the next decade, and it is
    why the provinces table on the <a href="#/population">People page</a> matters: most Vietnamese
    still live outside the two big cities.</p>
  </section>`;
}

// ---- Sources --------------------------------------------------------------
export function sources() {
  const rows = (arr, cols) => arr.map((r) => `<tr>${cols.map((c) => `<td class="${c.num ? 'num' : ''}">${c.f(r)}</td>`).join('')}</tr>`).join('');
  return `
  ${pageHead('Data & sources', 'Every number on this site, in one place, with its year and where it came from. If a figure here disagrees with a source, the source is right — tell us and we fix it.')}
  ${section('Headline figures, 2024',
    `<div class="table-wrap"><table><thead><tr><th>Indicator</th><th class="num">Value</th><th class="num">Year</th><th>Source</th></tr></thead><tbody>
    <tr><td>Population</td><td class="num">101.3 million</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>GDP</td><td class="num">$476.3 billion</td><td class="num">2024</td><td>World Bank</td></tr>
    <tr><td>GDP per person</td><td class="num">$4,700</td><td class="num">2024</td><td>World Bank</td></tr>
    <tr><td>Real GDP growth</td><td class="num">7.09%</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>Exports</td><td class="num">$405.5 billion</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>Imports</td><td class="num">$380.8 billion</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>FDI disbursed</td><td class="num">$25.4 billion</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>Inflation (CPI)</td><td class="num">3.63%</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>Unemployment</td><td class="num">2.24%</td><td class="num">2024</td><td>GSO</td></tr>
    <tr><td>Life expectancy</td><td class="num">74.7 years</td><td class="num">2024</td><td>GSO / World Bank</td></tr>
    <tr><td>Median age</td><td class="num">32.8 years</td><td class="num">2024</td><td>GSO</td></tr>
    </tbody></table></div>`,
    'Rounded to the precision the source publishes.')}
  ${section('The full decade',
    `<div class="table-wrap"><table><thead><tr><th>Year</th><th class="num">Population (m)</th><th class="num">GDP growth (%)</th><th class="num">GDP ($bn)</th><th class="num">Exports ($bn)</th><th class="num">Imports ($bn)</th><th class="num">CPI (%)</th></tr></thead><tbody>
    ${META.years.map((y) => {
      const p = POPULATION.find((d) => d.year === y), g = GDP_GROWTH.find((d) => d.year === y),
        u = GDP_USD.find((d) => d.year === y), t = TRADE.find((d) => d.year === y), c = CPI.find((d) => d.year === y);
      return `<tr><td>${y}</td><td class="num">${p.value.toFixed(1)}</td><td class="num">${g.value.toFixed(2)}</td><td class="num">${u.value.toFixed(1)}</td><td class="num">${t.exports.toFixed(1)}</td><td class="num">${t.imports.toFixed(1)}</td><td class="num">${c.value.toFixed(2)}</td></tr>`;
    }).join('')}
    </tbody></table></div>`,
    'The decade at a glance. Sources: GSO and World Bank.')}
  ${section('Where the numbers come from',
    `<ul class="source-list">${SOURCES.map((s) => `<li><strong>${s.name}</strong> (${s.short}) — ${s.what}. <span class="src-url">${s.url}</span></li>`).join('')}</ul>
    <h3>How we handle the numbers</h3>
    <ul class="method-list">
      <li>Figures are published aggregates, never modelled or estimated by this site — except the pyramid’s male/female split, which applies the national sex ratio to GSO age bands and is labelled as such.</li>
      <li>Provincial data is for 2024, when Viet Nam had 63 provinces and cities; the 2025 merger into 34 units post-dates it.</li>
      <li>Money is in current US dollars unless a figure says otherwise; growth and inflation are year-on-year percentages.</li>
      <li>This site is an independent, original presentation of public statistics. It is not affiliated with the GSO or the World Bank.</li>
    </ul>`)}
  `;
}

export function notFound() {
  return `${pageHead('Page not found', 'That page does not exist on this site.')}
  <section class="card"><p>Try the <a href="#/">overview</a>, <a href="#/population">people</a>, <a href="#/economy">economy</a>, <a href="#/living">living standards</a> or <a href="#/sources">data &amp; sources</a> pages.</p></section>`;
}
