import country from "./src/utils/countries.js";

// List first country
console.log(country.list()[0]);

// By alpha2 / alpha3 code
console.log(country.byCode("ET"));  // Ethiopia
console.log(country.byCode("ETH")); // Ethiopia

// By range
console.log(country.range("A", "E"));

// Search
console.log(country.search("eth"));

// By region
console.log(country.byRegion("Africa"));

// By currency
console.log(country.byCurrency("ETB"));

// By phone
console.log(country.byPhone("+251"));

// Names and flags
console.log(country.names());
console.log(country.flags());
