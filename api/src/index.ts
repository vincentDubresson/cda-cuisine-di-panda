import express from "express";
import IngredientTypeRepository from "./models/IngredientType.repository";
import * as IngredientTypesController from "./controllers/IngredientTypesController";
import { ingredientTypes } from "./models/IngredientType.service";
import { PORT } from "./utils";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Success ! The server is running on port ${PORT}.`);
});

app.get('/api/ingredient-types', IngredientTypesController.get);
app.get('/api/ingredient-types/:id', IngredientTypesController.getById);
app.post('/api/ingredient-types', IngredientTypesController.post);

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