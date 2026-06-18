import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function CategoryBarChart({ data = [] }) {

  const safeData = [...data]
    .map(item => ({
      category: item.category,
      revenue: Number(item.revenue || 0)
    }))
    .sort((a, b) => b.revenue - a.revenue); // 🔥 IMPORTANT FIX

  if (!safeData.length) {
    return (
      <div className="chart-box">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No category data available
        </p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>Category Sales (Revenue Ranking)</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={safeData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹ ${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Legend />

          <Bar
            dataKey="revenue"
            fill="#4f46e5"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
