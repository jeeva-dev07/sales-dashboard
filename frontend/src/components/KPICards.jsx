import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaTrophy
} from "react-icons/fa";

export default function KPICards({ data = {} }) {

  // ================= SAFE DATA =================
  const safeData = {
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    bestSellingProduct: "N/A",
    ...data
  };

  // ================= FORMAT =================
  const formatINR = (value) => {
    const num = Number(value);

    if (value === null || value === undefined || isNaN(num)) {
      return "₹ 0";
    }

    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      title: "Total Revenue",
      value: formatINR(safeData.totalRevenue),
      icon: <FaMoneyBillWave />,
      color1: "#4f46e5",
      color2: "#06b6d4"
    },
    {
      title: "Total Orders",
      value: safeData.totalOrders ?? 0,
      icon: <FaShoppingCart />,
      color1: "#22c55e",
      color2: "#16a34a"
    },
    {
      title: "Avg Order Value",
      value: formatINR(safeData.averageOrderValue),
      icon: <FaChartLine />,
      color1: "#f59e0b",
      color2: "#f97316"
    },
    {
      title: "Best Product",
      value: safeData.bestSellingProduct || "N/A",
      icon: <FaTrophy />,
      color1: "#ef4444",
      color2: "#ec4899"
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((item, index) => (
        <div
          key={index}
          className="kpi-card"
          style={{
            background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            minHeight: "110px"
          }}
        >
          <div style={{ fontSize: "22px", marginBottom: "10px" }}>
            {item.icon}
          </div>

          <div style={{ fontSize: "14px", opacity: 0.9 }}>
            {item.title}
          </div>

          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
