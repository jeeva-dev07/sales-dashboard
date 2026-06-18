export default function Navbar() {

  const isApiConnected = true; // you can later connect real API status

  return (
    <nav className="navbar">

      {/* ================= LEFT ================= */}
      <div className="nav-left">
        <div className="logo">📊</div>

        <div className="title">
          <h3>Sales Analytics Dashboard</h3>
          <p>Real-Time Business Insights</p>
        </div>
      </div>

      {/* ================= CENTER ================= */}
      <div className="nav-center">
        <div className="status-chip">
          <span className="pulse-dot"></span>
          Live Dashboard
        </div>

        <div className="year-chip">
          2024 - 2026 Data
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="nav-right">
        <div className="live-status">
          <span
            className="live-dot"
            style={{
              backgroundColor: isApiConnected ? "#22c55e" : "#ef4444"
            }}
          ></span>

          <span>
            {isApiConnected ? "API Connected" : "API Disconnected"}
          </span>
        </div>
      </div>

    </nav>
  );
}
