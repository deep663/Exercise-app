const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
require("dotenv").config();

const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', authRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

