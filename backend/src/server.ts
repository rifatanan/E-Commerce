import express from 'express';
import connectMongoDB from './configs/database.config';
import authRoute from "./v1/auth/route";
import categroyRoute from "./v1/category/route";
import productRoute from "./v1/product/route";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

connectMongoDB();

app.use("/api/auth", authRoute);
app.use("/api/category", categroyRoute)
app.use("/api/product", productRoute)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});