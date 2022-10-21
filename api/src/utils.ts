import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import path from "path";

import IngredientTypeRepository from "./models/IngredientTypes/IngredientType.repository";
import KeywordRepository from "./models/Keywords/Keyword.repository";
import MeasureUnityRepository from "./models/MeasureUnities/MeasureUnity.repository";
import IngredientTypeResolver from "./resolvers/IngredientTypes/IngredientTypes.resolver";
import KeywordResolver from "./resolvers/Keywords/Keywords.resolver";

import { ingredientTypes } from "./models/IngredientTypes/IngredientType.fixtures";
import { keywords } from "./models/Keywords/Keyword.fixtures";
import { measureUnities } from "./models/MeasureUnities/MeasureUnity.fixtures";
import MeasureUnityResolver from "./resolvers/MeasureUnities/MeasureUnities.resolver";
import CategoryRepository from "./models/Categories/Category.Repository";
import { categories } from "./models/Categories/Category.fixtures";
import CategoryResolver from "./resolvers/Categories/Categories.resolver";
import RateRepository from "./models/Rates/Rate.repository";
import { rates } from "./models/Rates/Rate.fixtures";
import RateResolver from "./resolvers/Rates/Rates.resolver";

export const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        IngredientTypeResolver,
        KeywordResolver,
        MeasureUnityResolver,
        CategoryResolver,
        RateResolver,
      ],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  server.listen().then(async ({ url }) => {
    // Put there repositories initialization
    await IngredientTypeRepository.initializeRepository();
    await KeywordRepository.initializeRepository();
    await MeasureUnityRepository.initializeRepository();
    await CategoryRepository.initializeRepository();
    await RateRepository.initializeRepository();
    // Put there database tables initialization
    await IngredientTypeRepository.initializeIngredientType(ingredientTypes);
    await KeywordRepository.initializeKeyword(keywords);
    await MeasureUnityRepository.initializeMeasureUnity(measureUnities);
    await CategoryRepository.initializeCategory(categories);
    await RateRepository.initializeRate(rates);

    console.log(`🚀  Server ready at ${url}`);
  });
};
