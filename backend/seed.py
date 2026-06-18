import mysql.connector
import random
from datetime import datetime, timedelta

# ================= DB CONNECTION =================
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="velmurugan2002",
    database="sales_analytics"
)

cur = db.cursor()

# ================= CLEAN TABLES =================
cur.execute("SET FOREIGN_KEY_CHECKS=0")
cur.execute("TRUNCATE TABLE sales")
cur.execute("TRUNCATE TABLE products")
cur.execute("TRUNCATE TABLE categories")
cur.execute("SET FOREIGN_KEY_CHECKS=1")

# ================= CATEGORIES =================
categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Sports"
]

for c in categories:
    cur.execute("INSERT INTO categories (name) VALUES (%s)", (c,))

db.commit()

# ================= PRODUCTS =================
products = [
    ("Laptop", 1),
    ("Mobile Phone", 1),
    ("Headphones", 1),
    ("TV", 1),

    ("T-Shirt", 2),
    ("Jeans", 2),
    ("Jacket", 2),

    ("Chocolate", 3),
    ("Coffee", 3),
    ("Biscuits", 3),

    ("Novel", 4),
    ("Notebook", 4),
    ("Pen Set", 4),

    ("Football", 5),
    ("Cricket Bat", 5)
]

for name, cat_id in products:
    price = random.randint(500, 80000)
    cur.execute(
        "INSERT INTO products (name, category_id, price) VALUES (%s, %s, %s)",
        (name, cat_id, price)
    )

db.commit()

# ================= SALES DATA (FIXED RANGE) =================
start_date = datetime(2025, 6, 1)   # ✅ START: June 2025

for _ in range(250):  # 🔥 250 records (good for charts)
    product_id = random.randint(1, 15)
    quantity = random.randint(1, 10)

    amount = quantity * random.randint(100, 5000)

    # ✅ FIXED RANGE: June 2025 → June 2026
    random_days = random.randint(0, 365)
    sold_on = start_date + timedelta(days=random_days)

    region = random.choice(["North", "South", "East", "West"])

    cur.execute("""
        INSERT INTO sales (product_id, quantity, total_amount, sold_on, region)
        VALUES (%s, %s, %s, %s, %s)
    """, (product_id, quantity, amount, sold_on, region))

db.commit()

cur.close()
db.close()

print("✅ Seed completed: 250 records from June 2025 to June 2026")
