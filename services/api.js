const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
}

export const fetchServices = async ({
  page = 1,
  perPage = 20,
  includeInactive = false,
}) => {
  const res = await fetch(
    `${BASE_URL}/services?page=${page}&perPage=${perPage}&includeInactive=${includeInactive}`
  );
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
};

export const fetchPrimaryConcerns = async ({
  serviceId,
  page = 1,
  perPage = 20,
  includeInactive = false,
}) => {
  const url = `${BASE_URL}/services/${serviceId}/primary-concerns?page=${page}&perPage=${perPage}&includeInactive=${includeInactive}`;
  console.log("Fetching primary concerns from:", url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error(`Failed to fetch primary concerns: ${res.status}`);
  }
  return res.json();
};
