import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// ================= SAFE REQUEST WRAPPER =================
const fetchData = async (url, params) => {
  try {
    const res = await axios.get(url, { params });

    // 🔥 CHECK BACKEND ERROR RESPONSE
    if (res.data?.error) {
      console.error("Backend Error:", res.data.error);
      return null;
    }

    return res.data;
  } catch (err) {
    console.error("API Failed:", url);
    console.error("Message:", err.message);
    return null; // IMPORTANT: use null not []
  }
};

// ================= KPI =================
export const getKpis = (params) =>
  fetchData(`${BASE_URL}/api/kpis`, params);

// ================= CHART APIs =================
export const getMonthly = (params) =>
  fetchData(`${BASE_URL}/api/sales/monthly`, params);

export const getCategory = (params) =>
  fetchData(`${BASE_URL}/api/sales/by-category`, params);

export const getRegion = (params) =>
  fetchData(`${BASE_URL}/api/sales/by-region`, params);

export const getTopProducts = (params) =>
  fetchData(`${BASE_URL}/api/sales/top-products`, params);
