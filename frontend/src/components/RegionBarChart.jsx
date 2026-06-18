import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

export default function RegionBarChart({ data = [] }) {

  // ================= SAFE CHECK =================
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="chart-box">
        <h3>Revenue by Region</h3>
        <p className="no-data">No region data available</p>
      </div>
    );
  }

  // ================= SAFE FORMAT =================
  const chartData = data
    .map((item) => ({
      name: item.region || item.name || "Unknown",
      value: Number(item.revenue ?? item.value ?? 0)
    }))
    .filter(item => !isNaN(item.value)) // 🔥 prevents NaN breaking chart
    .sort((a, b) => b.value - a.value);

  // extra safety
  if (chartData.length === 0) {
    return (
      <div className="chart-box">
        <h3>Revenue by Region</h3>
        <p className="no-data">Invalid region data</p>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="chart-box">
      <h3>Revenue by Region</h3>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            tickFormatter={(value) =>
              value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
            }
          />

          <YAxis type="category" dataKey="name" width={100} />

          <Tooltip
            formatter={(value) =>
              `₹ ${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.value === maxValue ? "#ef4444" : "#3b82f6"
                }
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
