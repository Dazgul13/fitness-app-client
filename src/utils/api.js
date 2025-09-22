// Centralized API helper to reduce duplicated fetch boilerplate
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function apiFetch(path, { method = 'GET', body, headers = {}, ...opts } = {}) {
  const token = localStorage.getItem('token');
  const finalHeaders = { ...headers };
  if (body && !finalHeaders['Content-Type']) finalHeaders['Content-Type'] = 'application/json';
  if (token && !finalHeaders['Authorization']) finalHeaders['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...opts
  });

  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    if (contentType.includes('application/json')) {
      const errJson = await res.json();
      throw new Error(errJson.error || errJson.message || JSON.stringify(errJson));
    }
    const txt = await res.text();
    throw new Error(txt || 'Request failed');
  }

  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export default apiFetch;
