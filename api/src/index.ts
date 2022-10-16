import express from "express";
import { PORT } from "./utils";

const app = express();

app.get('/', (req, res) => {
  res.send(`Success ! The server is running on port ${PORT}`);
});

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Success ! The server is running on port ${PORT}`);
  });
}

start();