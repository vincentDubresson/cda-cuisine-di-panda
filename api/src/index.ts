import express from "express";
import { getRoutes } from "./routes/routes";
import { startServer } from "./utils";

const app = express();
app.use(express.json());

getRoutes(app);

startServer(app);
