// Router + controls for Viet Nam in Numbers.
//
// Routes (hash, so the static files work from any server):
//   #/              Overview
//   #/population    People — pyramid + provinces table
//   #/economy       Economy — year in focus, GDP, trade, prices
//   #/living        Living standards
//   #/sources       Data & sources
//
// window.__shotReady is false while a page renders and true once it is
// on screen, so a screenshot script knows when to capture.

import { overview, population, economy, living, sources, notFound } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('site-nav');

// Control state, kept across re-renders within a route.
const state = {
  population: { region: 'All regions', search: '', sort: 'pop' },
  economy: { year: 2024, chart: 'bar' },
};

const ROUTES = {
  '': () => overview(),
  population: () => population(state.population),
  economy: () => economy(state.economy),
  living: () => living(),
  sources: () => sources(),
};

function currentRoute() {
  const m = location.hash.match(/^#\/([^/?]*)/);
  return m ? m[1] : '';
}

function render() {
  window.__shotReady = false;
  const route = currentRoute();
  const view = ROUTES[route];
  document.title = view
    ? `${route ? route[0].toUpperCase() + route.slice(1) : 'Overview'} | Viet Nam in Numbers`
    : 'Page not found | Viet Nam in Numbers';
  app.innerHTML = view ? view() : notFound();
  for (const a of nav.querySelectorAll('a')) {
    a.classList.toggle('active', a.dataset.route === route);
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Controls live inside #app; one delegated listener covers them all.
// Re-rendering after a change keeps every control doing what it says.
app.addEventListener('change', (event) => {
  const el = event.target;
  if (el.id === 'year-select') {
    state.economy.year = Number(el.value);
  } else if (el.id === 'region-filter') {
    state.population.region = el.value;
  } else if (el.id === 'province-sort') {
    state.population.sort = el.value;
  } else {
    return;
  }
  render();
});

app.addEventListener('input', (event) => {
  if (event.target.id === 'province-search') {
    state.population.search = event.target.value;
    // Re-render, then put the cursor back in the search box.
    render();
    const box = document.getElementById('province-search');
    if (box) { box.focus(); box.setSelectionRange(box.value.length, box.value.length); }
  }
});

app.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-chart]');
  if (!btn) return;
  state.economy.chart = btn.dataset.chart;
  render();
});

window.addEventListener('hashchange', render);
render();
