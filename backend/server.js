const express = require("express");
require("dotenv").config();
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

//Define Routers

app.use('/api/user', userRoutes)
app.use('/api/blog', blogRoutes)

//Middleware
app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));