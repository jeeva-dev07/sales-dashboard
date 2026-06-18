import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function CategoryPieChart({ data = [] }) {

  // ✅ Normalize + safety fix
  const safeData = Array.isArray(data)
    ? data.map(item => ({
        name: item.category || item.name || "Unknown",
        value: Number(item.revenue || item.value || 0)
      }))
    : [];

  // ❌ No data case
  if (!safeData.length) {
    return (
      <div className="chart-box">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No category data available
        </p>
      </div>
    );
  }

  // 🎨 Optional colors (Recharts will still work without this)
  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

  return (
    <div className="chart-box">
      <h3>Category Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip
            formatter={(value) =>
              `₹ ${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Legend />

          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {safeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
