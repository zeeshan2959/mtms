export const TIMEZONE_COUNTRIES = [
  {
    name: "Italy",
    zones: [{ name: "Italy", timeZone: "Europe/Rome", offset: "UTC+01:00" }],
  },
  {
    name: "Germany",
    zones: [{ name: "Germany", timeZone: "Europe/Berlin", offset: "UTC+01:00" }],
  },
  {
    name: "United States",
    zones: [
      { name: "Eastern", timeZone: "America/New_York", offset: "UTC-05:00" },
      { name: "Central", timeZone: "America/Chicago", offset: "UTC-06:00" },
      { name: "Mountain", timeZone: "America/Denver", offset: "UTC-07:00" },
      { name: "West Coast", timeZone: "America/Los_Angeles", offset: "UTC-08:00" },
    ],
  },
  {
    name: "Malaysia",
    zones: [{ name: "Malaysia", timeZone: "Asia/Kuala_Lumpur", offset: "UTC+08:00" }],
  },
  {
    name: "Pakistan",
    zones: [{ name: "Pakistan", timeZone: "Asia/Karachi", offset: "UTC+05:00" }],
  },
  {
    name: "Brazil",
    zones: [
      { name: "Fernando", timeZone: "America/Noronha", offset: "UTC-02:00" },
      { name: "Brasilia", timeZone: "America/Sao_Paulo", offset: "UTC-03:00" },
      { name: "Amazon", timeZone: "America/Manaus", offset: "UTC-04:00" },
      { name: "Acre", timeZone: "America/Rio_Branco", offset: "UTC-05:00" },
    ],
  },
];

export const TIMEZONE_COUNTRY_CODES = {
  IT: "Italy",
  DE: "Germany",
  US: "United States",
  MY: "Malaysia",
  PK: "Pakistan",
  BR: "Brazil",
};
