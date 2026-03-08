import express from 'express';
import connectMongoDB from './configs/database.config';
import authRoute from "./v1/auth/route";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

connectMongoDB();

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});