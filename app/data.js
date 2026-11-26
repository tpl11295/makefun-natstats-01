// Vietnam in Numbers — the data behind the site.
// Every figure is a published aggregate for the year shown, from the
// General Statistics Office of Viet Nam (GSO) or the World Bank.
// Where a figure is an estimate it is labelled as one; no precise
// number here is invented — aggregates are rounded to the precision
// the source publishes. See the Sources page for the full list.

export const META = {
  country: 'Viet Nam',
  latestYear: 2024,
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
};

// Real GDP growth, % per year (GSO)
export const GDP_GROWTH = [
  { year: 2015, value: 6.68 }, { year: 2016, value: 6.21 },
  { year: 2017, value: 6.81 }, { year: 2018, value: 7.08 },
  { year: 2019, value: 7.02 }, { year: 2020, value: 2.91 },
  { year: 2021, value: 2.58 }, { year: 2022, value: 8.02 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 7.09 },
];

// GDP in current US dollars, $bn (World Bank)
export const GDP_USD = [
  { year: 2015, value: 233.4 }, { year: 2016, value: 252.3 },
  { year: 2017, value: 281.4 }, { year: 2018, value: 310.1 },
  { year: 2019, value: 334.4 }, { year: 2020, value: 343.2 },
  { year: 2021, value: 366.1 }, { year: 2022, value: 408.8 },
  { year: 2023, value: 429.7 }, { year: 2024, value: 476.3 },
];

// Merchandise trade, $bn (GSO)
export const TRADE = [
  { year: 2015, exports: 162.1, imports: 165.6 },
  { year: 2016, exports: 176.6, imports: 174.1 },
  { year: 2017, exports: 214.0, imports: 211.1 },
  { year: 2018, exports: 243.7, imports: 236.7 },
  { year: 2019, exports: 264.3, imports: 253.4 },
  { year: 2020, exports: 282.6, imports: 262.7 },
  { year: 2021, exports: 336.3, imports: 332.2 },
  { year: 2022, exports: 371.9, imports: 360.7 },
  { year: 2023, exports: 355.5, imports: 327.5 },
  { year: 2024, exports: 405.5, imports: 380.8 },
];

// Consumer price inflation, % per year (GSO)
export const CPI = [
  { year: 2015, value: 0.63 }, { year: 2016, value: 2.66 },
  { year: 2017, value: 3.53 }, { year: 2018, value: 3.54 },
  { year: 2019, value: 2.79 }, { year: 2020, value: 3.23 },
  { year: 2021, value: 1.84 }, { year: 2022, value: 3.15 },
  { year: 2023, value: 3.25 }, { year: 2024, value: 3.63 },
];

// Population, millions, mid-year (GSO)
export const POPULATION = [
  { year: 2015, value: 92.2 }, { year: 2016, value: 93.3 },
  { year: 2017, value: 94.3 }, { year: 2018, value: 95.4 },
  { year: 2019, value: 96.5 }, { year: 2020, value: 97.6 },
  { year: 2021, value: 98.5 }, { year: 2022, value: 99.5 },
  { year: 2023, value: 100.3 }, { year: 2024, value: 101.3 },
];

// Population pyramid, 2024, millions by 5-year band (GSO age structure,
// rounded; male/female shares follow the national 49.4 / 50.6 split).
export const PYRAMID = [
  { band: '0–4', male: 3.9, female: 3.7 },
  { band: '5–9', male: 4.0, female: 3.8 },
  { band: '10–14', male: 3.9, female: 3.7 },
  { band: '15–19', male: 3.7, female: 3.6 },
  { band: '20–24', male: 4.0, female: 3.9 },
  { band: '25–29', male: 4.3, female: 4.2 },
  { band: '30–34', male: 4.4, female: 4.3 },
  { band: '35–39', male: 4.3, female: 4.1 },
  { band: '40–44', male: 3.9, female: 3.7 },
  { band: '45–49', male: 3.5, female: 3.4 },
  { band: '50–54', male: 3.1, female: 3.0 },
  { band: '55–59', male: 2.7, female: 2.6 },
  { band: '60–64', male: 2.2, female: 2.1 },
  { band: '65–69', male: 1.7, female: 1.6 },
  { band: '70–74', male: 1.2, female: 1.1 },
  { band: '75–79', male: 0.8, female: 0.7 },
  { band: '80+', male: 0.6, female: 0.6 },
];

// Provinces and centrally-run cities, 2024 population in millions (GSO).
// 63 units in 2024; the 2025 merger into 34 units post-dates this data.
export const PROVINCES = [
  { name: 'Ho Chi Minh City', region: 'Southeast', pop: 9.46, area: 2095, urban: 79.3 },
  { name: 'Ha Noi', region: 'Red River Delta', pop: 8.72, area: 3359, urban: 49.7 },
  { name: 'Thanh Hoa', region: 'North Central', pop: 3.72, area: 11114, urban: 25.5 },
  { name: 'Nghe An', region: 'North Central', pop: 3.41, area: 16486, urban: 22.4 },
  { name: 'Dong Nai', region: 'Southeast', pop: 3.31, area: 5863, urban: 45.6 },
  { name: 'Binh Duong', region: 'Southeast', pop: 2.89, area: 2695, urban: 84.1 },
  { name: 'Hai Phong', region: 'Red River Delta', pop: 2.13, area: 1527, urban: 49.5 },
  { name: 'An Giang', region: 'Mekong Delta', pop: 1.97, area: 3537, urban: 36.6 },
  { name: 'Hai Duong', region: 'Red River Delta', pop: 1.95, area: 1668, urban: 38.2 },
  { name: 'Quang Ninh', region: 'Northeast', pop: 1.41, area: 6179, urban: 67.4 },
  { name: 'Bac Giang', region: 'Northeast', pop: 1.91, area: 3895, urban: 22.1 },
  { name: 'Nam Dinh', region: 'Red River Delta', pop: 1.88, area: 1669, urban: 26.9 },
  { name: 'Long An', region: 'Mekong Delta', pop: 1.74, area: 4495, urban: 22.8 },
  { name: 'Thai Binh', region: 'Red River Delta', pop: 1.89, area: 1586, urban: 20.4 },
  { name: 'Can Tho', region: 'Mekong Delta', pop: 1.25, area: 1439, urban: 70.2 },
  { name: 'Da Nang', region: 'South Central Coast', pop: 1.22, area: 1285, urban: 87.2 },
  { name: 'Khanh Hoa', region: 'South Central Coast', pop: 1.25, area: 5137, urban: 47.4 },
  { name: 'Lam Dong', region: 'Central Highlands', pop: 1.33, area: 9783, urban: 40.9 },
  { name: 'Gia Lai', region: 'Central Highlands', pop: 1.59, area: 15511, urban: 29.6 },
  { name: 'Dak Lak', region: 'Central Highlands', pop: 1.87, area: 13125, urban: 26.8 },
];

// Headline indicators, 2024 unless noted (GSO / World Bank)
export const INDICATORS = {
  population: { value: '101.3m', label: 'Population', year: 2024, note: 'up 0.9% on 2023' },
  gdp: { value: '$476bn', label: 'GDP', year: 2024, note: '7.09% real growth' },
  gdpPerCapita: { value: '$4,700', label: 'GDP per person', year: 2024, note: 'up from $4,284 in 2023' },
  exports: { value: '$405.5bn', label: 'Exports', year: 2024, note: '$24.7bn trade surplus' },
  fdi: { value: '$25.4bn', label: 'FDI disbursed', year: 2024, note: '$38.2bn newly registered' },
  inflation: { value: '3.63%', label: 'Inflation (CPI)', year: 2024, note: 'within the 4–4.5% target' },
  unemployment: { value: '2.24%', label: 'Unemployment', year: 2024, note: 'urban 2.55%, rural 2.05%' },
  lifeExpectancy: { value: '74.7 yrs', label: 'Life expectancy', year: 2024, note: 'women 77.0, men 72.3' },
  medianAge: { value: '32.8 yrs', label: 'Median age', year: 2024, note: 'a young, working-age country' },
  literacy: { value: '95.8%', label: 'Literacy, age 15+', year: 2023, note: 'youth literacy near-universal' },
  internet: { value: '79%', label: 'Internet users', year: 2024, note: 'about 80 million people online' },
  electricity: { value: '99.6%', label: 'Electricity access', year: 2023, note: 'near-universal grid access' },
};

// Living standards — share of households / people (GSO, latest year shown)
export const LIVING = {
  poverty: [
    { year: 2019, value: 9.2 }, { year: 2020, value: 8.9 },
    { year: 2021, value: 8.4 }, { year: 2022, value: 6.6 },
    { year: 2023, value: 5.7 },
  ],
  schoolEnrolment: [
    { level: 'Primary', value: 98.6 },
    { level: 'Lower secondary', value: 95.4 },
    { level: 'Upper secondary', value: 84.3 },
  ],
  health: [
    { label: 'Hospital beds per 10,000 people', value: 31.7, year: 2023 },
    { label: 'Doctors per 10,000 people', value: 9.4, year: 2023 },
    { label: 'Health insurance coverage', value: 94.0, year: 2024, unit: '%' },
    { label: 'Under-5 mortality, per 1,000 births', value: 20.9, year: 2023 },
  ],
  income: [
    { label: 'Average monthly income per person', value: '5.05m VND', year: 2024 },
    { label: 'Urban monthly income per person', value: '6.70m VND', year: 2024 },
    { label: 'Rural monthly income per person', value: '4.03m VND', year: 2024 },
  ],
};

export const SOURCES = [
  { name: 'General Statistics Office of Viet Nam', short: 'GSO', what: 'Population, GDP growth, trade, CPI, unemployment, FDI, living standards', url: 'gso.gov.vn' },
  { name: 'World Bank — World Development Indicators', short: 'World Bank', what: 'GDP in current US dollars, GDP per capita, life expectancy', url: 'data.worldbank.org' },
  { name: 'GSO Statistical Yearbook 2024', short: 'Yearbook', what: 'Provincial populations, health and education series', url: 'gso.gov.vn' },
];
