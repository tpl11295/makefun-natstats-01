// Hand-rolled SVG charts. No libraries, no network: every chart is
// drawn from the numbers in data.js into an inline <svg>.

const RED = '#c0392b';
const TEAL = '#14524d';
const SAND = '#e8ddc8';
const INK = '#1d2b29';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// Vertical bar chart. points: [{label, value}], highlight: index or -1.
export function barChart(points, { height = 260, format = (v) => v, highlight = -1, yLabel = '' } = {}) {
  const W = 720, H = height, padL = 44, padB = 30, padT = 14;
  const max = Math.max(...points.map((p) => p.value)) * 1.12;
  const min = Math.min(0, ...points.map((p) => p.value));
  const plotW = W - padL - 8, plotH = H - padT - padB;
  const bw = plotW / points.length;
  const y = (v) => padT + plotH * (1 - (v - min) / (max - min));
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart${yLabel ? ': ' + esc(yLabel) : ''}">`;
  // gridlines at 0, 25, 50, 75, 100% of max
  for (let f = 0; f <= 4; f++) {
    const v = min + (max - min) * f / 4;
    s += `<line x1="${padL}" y1="${y(v)}" x2="${W - 8}" y2="${y(v)}" stroke="#e3dccb" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#7a7264">${format(v)}</text>`;
  }
  points.forEach((p, i) => {
    const x = padL + i * bw + bw * 0.18;
    const w = bw * 0.64;
    const fill = i === highlight ? RED : TEAL;
    s += `<rect x="${x.toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${w.toFixed(1)}" height="${(y(0) - y(p.value)).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${(y(p.value) - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${format(p.value)}</text>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#7a7264">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Line chart with dots. points: [{label, value}]
export function lineChart(points, { height = 260, format = (v) => v, yLabel = '' } = {}) {
  const W = 720, H = height, padL = 48, padB = 30, padT = 16;
  const vals = points.map((p) => p.value);
  let max = Math.max(...vals), min = Math.min(...vals);
  const pad = (max - min) * 0.15 || 1;
  max += pad; min -= pad;
  const plotW = W - padL - 12, plotH = H - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * plotW;
  const y = (v) => padT + plotH * (1 - (v - min) / (max - min));
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart${yLabel ? ': ' + esc(yLabel) : ''}">`;
  for (let f = 0; f <= 4; f++) {
    const v = min + (max - min) * f / 4;
    s += `<line x1="${padL}" y1="${y(v)}" x2="${W - 12}" y2="${y(v)}" stroke="#e3dccb" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#7a7264">${format(v)}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linejoin="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4" fill="#fff" stroke="${RED}" stroke-width="2"/>`;
    if ((i > 0 && i % 3 === 0) || i === points.length - 1) {
      s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${format(p.value)}</text>`;
    }
    s += `<text x="${x(i).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#7a7264">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Grouped bars (two series), e.g. exports vs imports.
export function groupedBars(points, { height = 280, format = (v) => v, legend = ['Series A', 'Series B'] } = {}) {
  const W = 720, H = height, padL = 48, padB = 30, padT = 30;
  const max = Math.max(...points.flatMap((p) => [p.a, p.b])) * 1.12;
  const plotW = W - padL - 8, plotH = H - padT - padB;
  const bw = plotW / points.length;
  const y = (v) => padT + plotH * (1 - v / max);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grouped bar chart">`;
  for (let f = 0; f <= 4; f++) {
    const v = max * f / 4;
    s += `<line x1="${padL}" y1="${y(v)}" x2="${W - 8}" y2="${y(v)}" stroke="#e3dccb" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#7a7264">${format(v)}</text>`;
  }
  s += `<g font-size="12" fill="${INK}"><rect x="${padL}" y="6" width="12" height="12" fill="${TEAL}"/><text x="${padL + 18}" y="16">${esc(legend[0])}</text><rect x="${padL + 110}" y="6" width="12" height="12" fill="${RED}"/><text x="${padL + 128}" y="16">${esc(legend[1])}</text></g>`;
  points.forEach((p, i) => {
    const x0 = padL + i * bw + bw * 0.14;
    const w = bw * 0.32;
    s += `<rect x="${x0.toFixed(1)}" y="${y(p.a).toFixed(1)}" width="${w.toFixed(1)}" height="${(y(0) - y(p.a)).toFixed(1)}" rx="2" fill="${TEAL}"/>`;
    s += `<rect x="${(x0 + w + 3).toFixed(1)}" y="${y(p.b).toFixed(1)}" width="${w.toFixed(1)}" height="${(y(0) - y(p.b)).toFixed(1)}" rx="2" fill="${RED}"/>`;
    s += `<text x="${(x0 + w).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#7a7264">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Population pyramid: bands [{band, male, female}] in millions.
export function pyramid(bands) {
  const W = 720, rowH = 24, padT = 26, padB = 8;
  const H = padT + bands.length * rowH + padB;
  const mid = W / 2;
  const max = Math.max(...bands.flatMap((b) => [b.male, b.female])) * 1.08;
  const half = mid - 64;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Population pyramid, 2024">`;
  s += `<text x="${mid - 72}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${TEAL}">Male</text>`;
  s += `<text x="${mid + 72}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${RED}">Female</text>`;
  bands.forEach((b, i) => {
    const y = padT + i * rowH;
    const mw = (b.male / max) * half;
    const fw = (b.female / max) * half;
    s += `<rect x="${(mid - 32 - mw).toFixed(1)}" y="${y + 2}" width="${mw.toFixed(1)}" height="${rowH - 5}" fill="${TEAL}"/>`;
    s += `<rect x="${(mid + 32).toFixed(1)}" y="${y + 2}" width="${fw.toFixed(1)}" height="${rowH - 5}" fill="${RED}"/>`;
    s += `<text x="${mid}" y="${y + 17}" text-anchor="middle" font-size="11" fill="${INK}">${esc(b.band)}</text>`;
    if (i % 4 === 0) {
      s += `<text x="${(mid - 36 - mw).toFixed(1)}" y="${y + 17}" text-anchor="end" font-size="10" fill="#7a7264">${b.male.toFixed(1)}m</text>`;
      s += `<text x="${(mid + 36 + fw).toFixed(1)}" y="${y + 17}" font-size="10" fill="#7a7264">${b.female.toFixed(1)}m</text>`;
    }
  });
  s += '</svg>';
  return s;
}

// Horizontal bars for a ranked list: [{label, value}]
export function hbars(rows, { format = (v) => v, maxValue = null } = {}) {
  const max = maxValue ?? Math.max(...rows.map((r) => r.value));
  return rows.map((r) => {
    const pct = Math.max(2, (r.value / max) * 100);
    return `<div class="hbar"><span class="hbar-label">${esc(r.label)}</span><span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%"></span></span><span class="hbar-value">${format(r.value)}</span></div>`;
  }).join('');
}
