import express from 'express';
import connectMongoDB from './configs/database.config';
import authRoute from "./v1/auth/route";
import categroyRoute from "./v1/category/route";
import bandRoute from "./v1/band/route";
import cartRoute from "./v1/cart/route";
import productRoute from "./v1/product/route";
import dotenv from 'dotenv'
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

connectMongoDB();

app.use("/api/auth", authRoute);
app.use("/api/category", categroyRoute);
app.use("/api/band", bandRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});