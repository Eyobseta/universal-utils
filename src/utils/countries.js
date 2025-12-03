// src/utils/countries.js
import countries from "../data/countries.json" assert { type: "json" };

function normalize(str) {
  return str?.toString().toLowerCase().trim() || "";
}

function normalizeLetter(str) {
  return str?.toUpperCase().replace(/[^A-Z]/g, "") || "";
}

class Countries {
  constructor(data) {
    this.data = data;
  }

  // → List all countries
  list() {
    return this.data;
  }

  // → Find by alpha2 or alpha3 code
  byCode(code) {
    if (!code) return null;
    const c = code.toUpperCase();
    return this.data.find(
      country => country.alpha2 === c || country.alpha3 === c
    ) || null;
  }

  // → Filter countries by first letter range (A–E)
  range(start, end) {
    if (!start || !end) return [];
    const s = normalizeLetter(start);
    const e = normalizeLetter(end);
    return this.data.filter(c => {
      const first = normalizeLetter(c.name[0]);
      return first >= s && first <= e;
    });
  }

  // → Search by name, capital, currency, code
  search(keyword) {
    if (!keyword) return [];
    const k = normalize(keyword);
    return this.data.filter(c => 
      normalize(c.name).includes(k) ||
      normalize(c.capital).includes(k) ||
      normalize(c.currency).includes(k) ||
      normalize(c.alpha2).includes(k) ||
      normalize(c.alpha3).includes(k)
    );
  }

  // → Filter by region
  byRegion(region) {
    if (!region) return [];
    const r = normalize(region);
    return this.data.filter(c => normalize(c.region) === r);
  }

  // → Filter by currency code
  byCurrency(currencyCode) {
    if (!currencyCode) return [];
    const c = currencyCode.toUpperCase();
    return this.data.filter(country => country.currency === c);
  }

  // → Filter by phone code (supports partial match)
  byPhone(phoneCode) {
    if (!phoneCode) return [];
    const p = phoneCode.toString();
    return this.data.filter(c => c.phone.includes(p));
  }

  // → Get array of country names
  names() {
    return this.data.map(c => c.name);
  }

  // → Get array of flags
  flags() {
    return this.data.map(c => c.flag);
  }

  // → Get localized name (future feature, if localNames added)
  getLocalizedName(code, lang) {
    const country = this.byCode(code);
    if (!country) return null;
    return country.localNames?.[lang] || country.name;
  }
}

// export a single instance
export default new Countries(countries);
