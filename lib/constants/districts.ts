export interface DistrictInfo {
  district_number: number;
  name: string;
  region: string;
  country: string;
}

export const GLOBAL_ROTARACT_DISTRICTS: DistrictInfo[] = [
  // Sri Lanka & Maldives
  { district_number: 3220, name: "District 3220", region: "Sri Lanka & Maldives", country: "Sri Lanka" },

  // South Asia — India
  { district_number: 3011, name: "District 3011", region: "Delhi & NCR", country: "India" },
  { district_number: 3012, name: "District 3012", region: "Delhi, Ghaziabad & Meerut", country: "India" },
  { district_number: 3040, name: "District 3040", region: "Madhya Pradesh & Gujarat", country: "India" },
  { district_number: 3054, name: "District 3054", region: "Rajasthan & Gujarat", country: "India" },
  { district_number: 3060, name: "District 3060", region: "Gujarat & Maharashtra", country: "India" },
  { district_number: 3080, name: "District 3080", region: "Chandigarh, Punjab & Haryana", country: "India" },
  { district_number: 3131, name: "District 3131", region: "Pune & Raigad", country: "India" },
  { district_number: 3132, name: "District 3132", region: "Maharashtra Central", country: "India" },
  { district_number: 3141, name: "District 3141", region: "Mumbai", country: "India" },
  { district_number: 3142, name: "District 3142", region: "Thane & Navi Mumbai", country: "India" },
  { district_number: 3150, name: "District 3150", region: "Telangana & Andhra Pradesh", country: "India" },
  { district_number: 3170, name: "District 3170", region: "Goa & North Karnataka", country: "India" },
  { district_number: 3181, name: "District 3181", region: "Mysore & Mangalore", country: "India" },
  { district_number: 3182, name: "District 3182", region: "Shimoga & Udupi", country: "India" },
  { district_number: 3190, name: "District 3190", region: "Bangalore", country: "India" },
  { district_number: 3201, name: "District 3201", region: "Coimbatore & Cochin", country: "India" },
  { district_number: 3202, name: "District 3202", region: "Kerala & Tamil Nadu", country: "India" },
  { district_number: 3203, name: "District 3203", region: "Erode & Tirupur", country: "India" },
  { district_number: 3232, name: "District 3232", region: "Chennai", country: "India" },
  { district_number: 3240, name: "District 3240", region: "North East India", country: "India" },
  { district_number: 3250, name: "District 3250", region: "Bihar & Jharkhand", country: "India" },
  { district_number: 3261, name: "District 3261", region: "Odisha & Chhattisgarh", country: "India" },
  { district_number: 3291, name: "District 3291", region: "Kolkata & West Bengal", country: "India" },

  // South Asia — Nepal & Bangladesh
  { district_number: 3292, name: "District 3292", region: "Nepal & Bhutan", country: "Nepal" },
  { district_number: 3281, name: "District 3281", region: "Bangladesh North", country: "Bangladesh" },
  { district_number: 3282, name: "District 3282", region: "Bangladesh South", country: "Bangladesh" },

  // Africa
  { district_number: 9110, name: "District 9110", region: "Lagos & Ogun States", country: "Nigeria" },
  { district_number: 9111, name: "District 9111", region: "Lagos Central", country: "Nigeria" },
  { district_number: 9125, name: "District 9125", region: "Abuja & Northern Nigeria", country: "Nigeria" },
  { district_number: 9141, name: "District 9141", region: "Rivers, Delta & Edo", country: "Nigeria" },
  { district_number: 9142, name: "District 9142", region: "South East Nigeria", country: "Nigeria" },
  { district_number: 9212, name: "District 9212", region: "Kenya, Ethiopia, South Sudan & Eritrea", country: "Kenya" },
  { district_number: 9213, name: "District 9213", region: "Uganda", country: "Uganda" },
  { district_number: 9214, name: "District 9214", region: "Uganda & Tanzania", country: "Uganda" },
  { district_number: 9400, name: "District 9400", region: "South Africa, Botswana & Mozambique", country: "South Africa" },

  // Middle East & Mediterranean
  { district_number: 2452, name: "District 2452", region: "UAE, Lebanon, Jordan, Cyprus, Bahrain & Sudan", country: "UAE" },
  { district_number: 2451, name: "District 2451", region: "Egypt", country: "Egypt" },
  { district_number: 2420, name: "District 2420", region: "Istanbul & Northern Turkey", country: "Turkey" },

  // Southeast Asia & East Asia
  { district_number: 3300, name: "District 3300", region: "West Malaysia", country: "Malaysia" },
  { district_number: 3310, name: "District 3310", region: "Singapore, Brunei & East Malaysia", country: "Singapore" },
  { district_number: 3810, name: "District 3810", region: "Manila & Cavite", country: "Philippines" },
  { district_number: 3830, name: "District 3830", region: "Makati & Southern Tagalog", country: "Philippines" },
  { district_number: 3800, name: "District 3800", region: "Rizal & Metro Manila North", country: "Philippines" },
  { district_number: 3350, name: "District 3350", region: "Central Thailand", country: "Thailand" },
  { district_number: 3450, name: "District 3450", region: "Hong Kong, Macau & Mongolia", country: "Hong Kong" },

  // Americas & Europe
  { district_number: 7020, name: "District 7020", region: "Northern Caribbean (Jamaica, Bahamas, Haiti)", country: "Jamaica" },
  { district_number: 7030, name: "District 7030", region: "Southern Caribbean (Barbados, Trinidad, Guyana)", country: "Barbados" },
  { district_number: 1090, name: "District 1090", region: "Thames Valley & Oxford", country: "United Kingdom" },
  { district_number: 1910, name: "District 1910", region: "Eastern Austria & Bosnia", country: "Austria" },
  { district_number: 2041, name: "District 2041", region: "Milan", country: "Italy" },
  { district_number: 2202, name: "District 2202", region: "Barcelona & Northern Spain", country: "Spain" },
  { district_number: 5170, name: "District 5170", region: "Silicon Valley & Bay Area", country: "United States" },
  { district_number: 5280, name: "District 5280", region: "Los Angeles", country: "United States" },
  { district_number: 7230, name: "District 7230", region: "New York & Bermuda", country: "United States" },
  { district_number: 4420, name: "District 4420", region: "São Paulo", country: "Brazil" },
  { district_number: 4895, name: "District 4895", region: "Buenos Aires", country: "Argentina" },
  { district_number: 4170, name: "District 4170", region: "Mexico City", country: "Mexico" },
  { district_number: 9675, name: "District 9675", region: "Sydney", country: "Australia" },
];

export function getDistrictLabel(districtNumber: number | string): string {
  const num = typeof districtNumber === "string" ? parseInt(districtNumber, 10) : districtNumber;
  const found = GLOBAL_ROTARACT_DISTRICTS.find((d) => d.district_number === num);
  if (found) {
    return `${found.name} - ${found.region}`;
  }
  return `District ${districtNumber}`;
}
