import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import promptRoutes from "./routes/prompt.js";
import responseRoutes from './routes/response.js';

dotenv.config();
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors("*"));


app.get("/",(req,res)=>{
    res.send("Hello baby");
})

app.use("/api/auth",authRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/res",responseRoutes);

connectDB().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
  });
});