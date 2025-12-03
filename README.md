# Universal Utils

A modern, lightweight, and modular utility library for JavaScript developers.  
Currently focused on **country data** with plans to expand to numbers, letters, timezones, currencies, and more.

---

## Features

### Country Module

Provides comprehensive country-related data and utility functions:

- **Full list of countries** with ISO codes, capitals, regions, currencies, phone codes, and flags.
- **Searchable** by name, capital, currency, alpha-2, or alpha-3 code.
- **Filterable** by region, currency, or phone code.
- **Supports first-letter ranges**.
- **Array utilities** for names and flags.
- Placeholder for **localized names** (i18n ready).

---

## Installation

```bash
npm install universal-utils
```
or use via ES Modules:

```bash
import country from "./src/utils/countries.js";
```

## Usage
Importing the module

```bash
import country from "./src/utils/countries.js";
```

List all countries
```console.log(country.list()[0]);
   {
      name: "Ethiopia",
      alpha2: "ET",
      alpha3: "ETH",
      capital: "Addis Ababa",
      region: "Africa",
      currency: "ETB",
      currencySymbol: "Br",
      phone: "+251",
      flag: "🇪🇹"
 }
```

Find by code

```
country.byCode("US");   // Alpha-2
country.byCode("USA");  // Alpha-3
```

Filter by first letter range

```
country.range("A", "E");
```

Search by keyword

```
country.search("eth"); // Matches name, capital, currency, alpha2, alpha3
```

Filter by region

```
country.byRegion("Africa");
```

Filter by currency

```
country.byCurrency("ETB");
```

Filter by phone code

```
country.byPhone("+251");
```

Get all country names

```
country.names();
```

Get all country flags

```
country.flags();
```

Localized names (future feature)

```
country.getLocalizedName("ET", "am"); // If localNames are added
```


## Data Source

- Country data is fetched from (REST Countries API ) and stored in (countries.json).

- Flags are automatically generated using Unicode regional indicators.

- Currency symbols are included for common currencies; more can be added as needed.

## Project Structure
```
universal-utils/
│
├─ src/
│   ├─ data/
│   │   └─ countries.json
│   └─ utils/
│       └─ countries.js
│
├─ scripts/
│   └─ build-countries.js
│
├─ test.js
├─ package.json
└─ README.md

```
## Future Plans

--Add number formats, letters, timezones, date helpers, phone utilities, currency utilities, random generators, validators, and more.

--Fully support internationalization (i18n) for multiple languages like Amharic, Arabic, French, etc.

--Expand currency symbols to cover all world currencies.

## License
### MIT License
