// Set VITE_API_URL to the public Render backend origin in Vercel.
// Example: https://your-service.onrender.com (without /api or a trailing slash).
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
