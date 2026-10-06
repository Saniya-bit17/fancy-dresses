// Dynamic base API URL supporting Vercel environment variables with local fallback
const rawApiUrl = (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000/api';
const normalizedBase = rawApiUrl.replace(/\/+$/, '');
const API_BASE_URL = normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;


/**
 * Universal safe fetch wrapper that falls back gracefully if backend is offline.
 */
async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[Maison Solène API Offline / Fallback for ${endpoint}]:`, err.message);
    return null;
  }
}

export const api = {
  // Check backend health
  checkHealth: async () => {
    return await fetchApi('/health');
  },

  // Appointments
  createAppointment: async (appointmentData) => {
    const res = await fetchApi('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
    return res;
  },

  getAppointments: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await fetchApi(`/appointments${query ? `?${query}` : ''}`);
  },

  // Inquiries
  createInquiry: async (inquiryData) => {
    return await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  // Newsletter
  subscribeNewsletter: async (email) => {
    return await fetchApi('/inquiries/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Bespoke Measurements
  saveMeasurements: async (measurementData) => {
    return await fetchApi('/measurements', {
      method: 'POST',
      body: JSON.stringify(measurementData)
    });
  },

  // Catalog
  getDresses: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await fetchApi(`/dresses${query ? `?${query}` : ''}`);
  },

  // Atelier
  getAtelierInfo: async () => {
    return await fetchApi('/atelier');
  }
};
