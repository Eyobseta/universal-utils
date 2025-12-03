import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ---------------------
// Paths
// ---------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "src/data");
const DATA_FILE = path.join(DATA_DIR, "countries.json");

// ---------------------
// API
// ---------------------
const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region,currencies,idd";

// ---------------------
// Currency symbols
// You can extend this JSON with more currencies
// ---------------------
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ETB: "Br",
  MAD: "DH",
  JPY: "¥",
  // ... add more symbols as needed
};

// ---------------------
// Helpers
// ---------------------
function getFlagEmoji(alpha2Code) {
  return alpha2Code
    .toUpperCase()
    .split("")
    .map(c => String.fromCodePoint(0x1F1E6 + (c.charCodeAt(0) - 65)))
    .join("");
}

// ---------------------
// Build function
// ---------------------
async function build() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const data = await res.json();

    const countries = data.map(c => {
      const name = c.name.common;
      const alpha2 = c.cca2 || "";
      const alpha3 = c.cca3 || "";
      const capital = Array.isArray(c.capital) ? c.capital[0] : c.capital || "";
      const region = c.region || "";
      const currency = c.currencies ? Object.keys(c.currencies)[0] : "";
      const currencySymbol = currencySymbols[currency] || "";
      const phone = c.idd?.root ? c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "") : "";
      const flag = getFlagEmoji(alpha2);

      return { name, alpha2, alpha3, capital, region, currency, currencySymbol, phone, flag };
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(countries, null, 2), "utf-8");
    console.log(`Built countries.json — ${countries.length} entries at ${DATA_FILE}`);
  } catch (err) {
    console.error("Build failed:", err);
  }
}

build();
