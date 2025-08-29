require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cookieParser = require("cookie-parser");
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // your dev frontend
  "expense-tracker-4iqe-m61arg6a7-khushisiwachs-projects.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth/income", incomeRoutes);
app.use("/api/v1/auth/expense", expenseRoutes);
app.use("/api/v1/auth/dashboard", dashboardRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
