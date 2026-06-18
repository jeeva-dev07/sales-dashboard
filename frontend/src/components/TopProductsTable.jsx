export default function TopProductsTable({ data = [] }) {

  // ================= SAFE FORMAT =================
  const safeData = Array.isArray(data)
    ? data.map((p) => ({
        product: p.product || p.product_name || p.name || "N/A",
        category: p.category || "Unknown",
        unitsSold: Number(p.unitsSold ?? p.units_sold ?? p.quantity ?? 0),
        revenue: Number(p.revenue ?? p.total_revenue ?? 0)
      }))
    : [];

  return (
    <div className="table-card">
      <h3 className="table-title">🏆 Top Products</h3>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Product</th>
            <th>Category</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>

        <tbody>
          {safeData.length > 0 ? (
            safeData.map((p, i) => (
              <tr
                key={i}
                style={{
                  background: i === 0 ? "#fef3c7" : "transparent"
                }}
              >
                {/* Rank */}
                <td>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </td>

                {/* Product */}
                <td style={{ fontWeight: "600" }}>
                  {p.product}
                </td>

                {/* Category */}
                <td>{p.category}</td>

                {/* Units */}
                <td>
                  {p.unitsSold.toLocaleString("en-IN")}
                </td>

                {/* Revenue */}
                <td>
                  ₹ {p.revenue.toLocaleString("en-IN")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#64748b"
                }}
              >
                No product data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
