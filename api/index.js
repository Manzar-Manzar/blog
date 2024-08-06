import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Mongodb connection success")
})
.catch(err => console.log(`Mongodb error: ${err}`))

const app = express()

const port = process.env.PORT || 3001; // Change 3001 to any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json())

app.get('/test', (req, res) => {
    res.json({message: 'A'})
})

app.use('/api/user', userRoutes)

app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});