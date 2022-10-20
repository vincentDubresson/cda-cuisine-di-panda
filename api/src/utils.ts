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

export const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [IngredientTypeResolver, KeywordResolver, MeasureUnityResolver],
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
    // Put there database tables initialization
    await IngredientTypeRepository.initializeIngredientType(ingredientTypes);
    await KeywordRepository.initializeKeyword(keywords);
    await MeasureUnityRepository.initializeMeasureUnity(measureUnities);

    console.log(`🚀  Server ready at ${url}`);
  });
};
