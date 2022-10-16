import express from "express";
import IngredientTypeRepository from "./models/IngredientType.repository";
import { ingredientTypes } from "./models/IngredientType.service";
import { PORT } from "./utils";

const app = express();
app.use(express.json);

app.get('/', (req, res) => {
  res.send(`Success ! The server is running on port ${PORT}.`);
});

const start = async () => {
  // Put there repositories initialization
  await IngredientTypeRepository.initializeRepository();

  // Put there database tables initialization
  await IngredientTypeRepository.initializeIngredientType(ingredientTypes);


  app.listen(PORT, () => {
    console.log(`Success ! The server is running on port ${PORT}.`);
  });
}

start();