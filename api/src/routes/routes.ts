/* import { Application } from "express";
import * as IngredientTypesController from "../controllers/IngredientTypesController";
//import * as KeywordsController from "../controllers/KeywordsController";
import { PORT } from "../utils";

/* const INGREDIENT_TYPES_PATH = "/api/ingredient-types";
const KEYWORDS_PATH = "api/keywords";

export const getRoutes = (app: Application) => {
  // Home Route
  app.get("/", (req, res) => {
    res.send(`Success ! The server is running on port ${PORT}.`);
  });
  // Routes for Ingredient Types.
  app.get(`${INGREDIENT_TYPES_PATH}`, IngredientTypesController.get);
  app.get(`${INGREDIENT_TYPES_PATH}/:slug`, IngredientTypesController.getBySlug);
  app.post(`${INGREDIENT_TYPES_PATH}`, IngredientTypesController.post);
<<<<<<< HEAD
  app.put(`${INGREDIENT_TYPES_PATH}/:slug`, IngredientTypesController.put);
  app.delete(`${INGREDIENT_TYPES_PATH}/:slug`, IngredientTypesController.del);
=======
  app.put(`${INGREDIENT_TYPES_PATH}/:id`, IngredientTypesController.put);
  app.delete(`${INGREDIENT_TYPES_PATH}/:id`, IngredientTypesController.del);

  // Routes for Keywords.
  // app.get(`${KEYWORDS_PATH}`, KeywordsController.get);
  // app.get(`${KEYWORDS_PATH}/:id`, KeywordsController.getById);
  // app.post(`${KEYWORDS_PATH}`, KeywordsController.post);
  // app.put(`${KEYWORDS_PATH}/:id`, KeywordsController.put);
  // app.delete(`${KEYWORDS_PATH}/:id`, KeywordsController.del);
>>>>>>> f658302 (Initialization of keyword at server start)
}; */
