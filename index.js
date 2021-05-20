const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/db.connection");
const quizRoutes = require("./routes/quiz.router");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/quiz", quizRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
