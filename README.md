📊 Task 11 - Sales Analytics Dashboard
>>Project Overview
This project is a Sales Analytics Dashboard built using React (Frontend) and Flask (Backend) with MySQL database.
It visualizes sales data using charts, tables, and KPI cards.
>> Tech Stack
React.js
Flask (Python)
MySQL
Recharts (Graphs)
 CSS 
 >>Project Structure
project-root/
│
├── backend/
│   ├── app.py
│   ├── database connection
│   └── API routes
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── pages/
│   └── package.json
│
└── README.md
>>Features
Total Revenue KPI
Total Orders
Average Order Value
Best Selling Product
Category-wise Bar Chart
Revenue Line Chart
Region Analysis Top Products Table
>>API Endpoints
Method	Endpoint	Description
GET	/api/kpis	KPI summary data
GET	/api/revenue	Revenue trend data
GET	/api/categories	Category analytics
GET	/api/regions	Region data
GET	/api/top-products	Top products list
>>Setup Instructions
🔹 1. Clone Repository
git clone https://github.com/jeeva-dev07/sales-dashboard.git
cd sales-dashboard
🔹 2. Backend Setup (Flask)
cd backend
pip install flask flask-cors mysql-connector-python
python seed.py   
python app.py
🔹 3. Frontend Setup (React)
cd frontend
npm install
npm run dev
..Database Setup
CREATE DATABASE sales_analytics;
Run schema + seed data from seed.py
Update DB credentials inside app.py
>>Output Preview
Interactive dashboard with charts 
KPI cards with real-time values 
Clean UI analytics view 
Developer Notes
Ensure backend runs on correct port (e.g., 5000)
Check API URLs in api.js
Use CORS enabled backend for frontend connection
>>Important
Do not upload node_modules
Do not upload .env file
Always run backend before frontend
>> Status
 Completed Task 11 – Sales Dashboard
 Fully functional Full Stack project

