from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ================= DB CONNECTION =================
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="velmurugan2002",
        database="sales_analytics",
        connection_timeout=5
    )

# ================= FILTER BUILDER =================
def build_filters():
    conditions = []
    params = []

    month = request.args.get("month")
    year = request.args.get("year")
    category = request.args.get("category")

    if month:
        conditions.append("MONTH(s.sold_on) = %s")
        params.append(month)

    if year:
        conditions.append("YEAR(s.sold_on) = %s")
        params.append(year)

    if category and category != "All":
        conditions.append("c.name = %s")
        params.append(category)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    return where, params


# ================= KPI API =================
@app.route("/api/kpis")
def kpis():
    try:
        db = get_db()
        cur = db.cursor(dictionary=True)

        where, params = build_filters()

        cur.execute(f"""
            SELECT 
                COALESCE(SUM(s.total_amount),0) AS totalRevenue,
                COALESCE(AVG(s.total_amount),0) AS averageOrderValue
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
        """, params)

        kpi = cur.fetchone()

        cur.execute(f"""
            SELECT COUNT(*) AS totalOrders
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
        """, params)

        orders = cur.fetchone()

        cur.execute(f"""
            SELECT p.name AS product
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
            GROUP BY p.name
            ORDER BY SUM(s.total_amount) DESC
            LIMIT 1
        """, params)

        best = cur.fetchone()

        cur.close()
        db.close()

        return jsonify({
            "totalRevenue": float(kpi["totalRevenue"] or 0),
            "averageOrderValue": float(kpi["averageOrderValue"] or 0),
            "totalOrders": int(orders["totalOrders"] or 0),
            "bestSellingProduct": best["product"] if best else "N/A"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= MONTHLY (SAFE + NO MYSQL ERROR) =================
@app.route("/api/sales/monthly")
def monthly():
    try:
        db = get_db()
        cur = db.cursor(dictionary=True)

        where, params = build_filters()

        cur.execute(f"""
            SELECT 
                t.month,
                SUM(t.amount) AS revenue
            FROM (
                SELECT 
                    DATE_FORMAT(s.sold_on, '%Y-%m') AS month,
                    s.total_amount AS amount
                FROM sales s
                JOIN products p ON s.product_id = p.id
                JOIN categories c ON p.category_id = c.id
                {where}
            ) t
            GROUP BY t.month
            ORDER BY t.month
        """, params)

        data = cur.fetchall()

        cur.close()
        db.close()

        return jsonify(data or [])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= CATEGORY =================
@app.route("/api/sales/by-category")
def by_category():
    try:
        db = get_db()
        cur = db.cursor(dictionary=True)

        where, params = build_filters()

        cur.execute(f"""
            SELECT 
                c.name AS category,
                COALESCE(SUM(s.total_amount),0) AS revenue
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
            GROUP BY c.name
            ORDER BY revenue DESC
        """, params)

        data = cur.fetchall()

        cur.close()
        db.close()

        return jsonify(data or [])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= REGION =================
@app.route("/api/sales/by-region")
def by_region():
    try:
        db = get_db()
        cur = db.cursor(dictionary=True)

        where, params = build_filters()

        cur.execute(f"""
            SELECT 
                s.region,
                COALESCE(SUM(s.total_amount),0) AS revenue
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
            GROUP BY s.region
            ORDER BY revenue DESC
        """, params)

        data = cur.fetchall()

        cur.close()
        db.close()

        return jsonify(data or [])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= TOP PRODUCTS =================
@app.route("/api/sales/top-products")
def top_products():
    try:
        db = get_db()
        cur = db.cursor(dictionary=True)

        where, params = build_filters()

        cur.execute(f"""
            SELECT 
                p.name AS product,
                c.name AS category,
                COALESCE(SUM(s.quantity),0) AS unitsSold,
                COALESCE(SUM(s.total_amount),0) AS revenue
            FROM sales s
            JOIN products p ON s.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            {where}
            GROUP BY p.id, c.name
            ORDER BY revenue DESC
            LIMIT 5
        """, params)

        data = cur.fetchall()

        cur.close()
        db.close()

        return jsonify(data or [])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= ROOT =================
@app.route("/")
def home():
    return "🚀 Sales Analytics API Running Successfully"


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)
