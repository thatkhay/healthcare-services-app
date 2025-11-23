const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
}

// Helper to get auth headers
const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Generic fetch wrapper with error handling
const apiFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `Request failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchServices = async ({
  page = 1,
  perPage = 20,
  includeInactive = false,
}) => {
  return apiFetch(
    `${BASE_URL}/services?page=${page}&perPage=${perPage}&includeInactive=${includeInactive}`
  );
};

export const fetchPrimaryConcerns = async ({
  serviceId,
  page = 1,
  perPage = 20,
  includeInactive = false,
}) => {
  const url = `${BASE_URL}/services/${serviceId}/primary-concerns?page=${page}&perPage=${perPage}&includeInactive=${includeInactive}`;
  console.log("Fetching primary concerns from:", url);
  return apiFetch(url);
};

export const loginUser = async (credentials) => {
  return apiFetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
};

export const createUser = async ({ userData, token }) => {
  return apiFetch(`${BASE_URL}/auth/users`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(userData),
  });
};

// Fetch providers for logged-in user
export const fetchProviders = async ({
  token,
  page = 1,
  perPage = 20,
  status,
  serviceId,
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (status) params.append("status", status);
  if (serviceId) params.append("serviceId", serviceId);

  return apiFetch(`${BASE_URL}/providers?${params.toString()}`, {
    headers: getAuthHeaders(token),
  });
};

// Verify token validity
export const verifyToken = async (token) => {
  return apiFetch(`${BASE_URL}/auth/verify`, {
    headers: getAuthHeaders(token),
  });
};

// Refresh token if needed
export const refreshToken = async (token) => {
  return apiFetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: getAuthHeaders(token),
  });
};
