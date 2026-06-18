import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import KPICards from "./components/KPICards";
import RevenueLineChart from "./components/RevenueLineChart";
import CategoryBarChart from "./components/CategoryBarChart";
import CategoryPieChart from "./components/CategoryPieChart";
import RegionBarChart from "./components/RegionBarChart";
import FilterBar from "./components/FilterBar";
import TopProductsTable from "./components/TopProductsTable";

const BASE_URL = "http://127.0.0.1:5000";

export default function App() {

  // ================= FILTER STATE (MATCH BACKEND) =================
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    category: "All"
  });

  const [loading, setLoading] = useState(false);

  const [kpi, setKpi] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // ================= FETCH ALL DATA =================
  const fetchAllData = async (params) => {
    try {
      setLoading(true);

      const [kpiRes, revRes, catRes, regRes, topRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/api/kpis`, { params }),
          axios.get(`${BASE_URL}/api/sales/monthly`, { params }),
          axios.get(`${BASE_URL}/api/sales/by-category`, { params }),
          axios.get(`${BASE_URL}/api/sales/by-region`, { params }),
          axios.get(`${BASE_URL}/api/sales/top-products`, { params }),
        ]);

      // ================= SAFE SET =================
      setKpi(kpiRes.data ?? {});

      setRevenue(Array.isArray(revRes.data) ? revRes.data : []);
      setCategory(Array.isArray(catRes.data) ? catRes.data : []);
      setRegion(Array.isArray(regRes.data) ? regRes.data : []);
      setTopProducts(Array.isArray(topRes.data) ? topRes.data : []);

    } catch (err) {
      console.error("API error:", err);

      setKpi({});
      setRevenue([]);
      setCategory([]);
      setRegion([]);
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= SINGLE USEEFFECT (FIXED) =================
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllData(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // ================= LOADING FIX =================
  if (loading && Object.keys(kpi).length === 0) {
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <h3 className="loading">Loading dashboard data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="app">

      <Navbar />

      <div className="container">

        {/* FILTER */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* KPI */}
        <KPICards data={kpi} />

        {/* ROW 1 */}
        <div className="section grid-2">

          <div className="chart-box">
            <h3>Revenue Trend</h3>
            <RevenueLineChart data={revenue} />
          </div>

          <div className="chart-box">
            <h3>Category Sales</h3>
            <CategoryBarChart data={category} />
          </div>

        </div>

        {/* ROW 2 */}
        <div className="section grid-2">

          <div className="chart-box">
            <h3>Region Performance</h3>
            <RegionBarChart data={region} />
          </div>

          <div className="chart-box">
            <h3>Category Distribution</h3>
            <CategoryPieChart data={category} />
          </div>

        </div>

        {/* TABLE */}
        <div className="section">
          <div className="chart-box">
            <h3>Top 5 Products</h3>
            <TopProductsTable data={topProducts} />
          </div>
        </div>

      </div>
    </div>
  );
}
