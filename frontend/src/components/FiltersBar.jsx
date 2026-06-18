export default function FilterBar({ filters, setFilters }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Sales Analytics Dashboard</h1>

      <div style={gridStyle}>

        {/* MONTH */}
        <div>
          <label style={labelStyle}>Month</label>
          <select
            name="month"
            value={filters.month || ""}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* YEAR */}
        <div>
          <label style={labelStyle}>Year</label>
          <select
            name="year"
            value={filters.year || ""}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label style={labelStyle}>Category</label>
          <select
            name="category"
            value={filters.category || "All"}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  padding: "20px",
  background: "#fff",
  borderRadius: "12px",
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "26px",
  fontWeight: "700",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
