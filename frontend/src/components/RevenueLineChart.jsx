import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function RevenueLineChart({ data = [] }) {

  console.log("Revenue Raw Data:", data);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No revenue data available</div>;
  }

  const chartData = data
    .map((item) => ({
      // ✅ keep API month
      month: item.month || "Unknown",

      // 🔥 FIX: convert string → number
      revenue: Number(item.revenue || 0)
    }))
    .filter((item) => item.month !== "Unknown");

  if (chartData.length === 0) {
    return <div>No revenue data available</div>;
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) =>
              value >= 1000
                ? `${(value / 1000).toFixed(0)}k`
                : value
            }
          />

          <Tooltip
            formatter={(value) =>
              `₹ ${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
