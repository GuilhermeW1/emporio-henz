const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function api(
  method,
  endpoint,
  { body, headers, ...customConfig } = {},
) {
  // const token = localStorage.getItem("token");
  const isFormData = body instanceof FormData;

  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      // ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/api${endpoint}`, config);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Erro na requisição");
  }

  return data;
}
