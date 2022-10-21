import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import path from "path";

import IngredientTypeRepository from "./models/IngredientTypes/IngredientType.repository";
import IngredientTypeResolver from "./resolvers/IngredientTypes/IngredientTypes.resolver";
import KeywordRepository from "./models/Keywords/Keyword.repository";
import KeywordResolver from "./resolvers/Keywords/Keywords.resolver";
import MeasureUnityRepository from "./models/MeasureUnities/MeasureUnity.repository";
import MeasureUnityResolver from "./resolvers/MeasureUnities/MeasureUnities.resolver";
import CategoryRepository from "./models/Categories/Category.Repository";
import CategoryResolver from "./resolvers/Categories/Categories.resolver";
import RateRepository from "./models/Rates/Rate.repository";
import RateResolver from "./resolvers/Rates/Rates.resolver";
import UserRepository from "./models/Users/User.repository";
import UserResolver from "./resolvers/Users/Users.resolver";
import OriginRepository from "./models/Origins/Origin.repository";

import { ingredientTypes } from "./models/IngredientTypes/IngredientType.fixtures";
import { keywords } from "./models/Keywords/Keyword.fixtures";
import { measureUnities } from "./models/MeasureUnities/MeasureUnity.fixtures";
import { categories } from "./models/Categories/Category.fixtures";
import { rates } from "./models/Rates/Rate.fixtures";
import { users } from "./models/Users/User.fixtures";
import { origins } from "./models/Origins/Origin.fixtures";
import OriginResolver from "./resolvers/Origins/Origins.resolver";

export const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        IngredientTypeResolver,
        KeywordResolver,
        MeasureUnityResolver,
        CategoryResolver,
        RateResolver,
        UserResolver,
        OriginResolver,
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
    await UserRepository.initializeRepository();
    await OriginRepository.initializeRepository();
    // Put there database tables initialization
    await IngredientTypeRepository.initializeIngredientType(ingredientTypes);
    await KeywordRepository.initializeKeyword(keywords);
    await MeasureUnityRepository.initializeMeasureUnity(measureUnities);
    await CategoryRepository.initializeCategory(categories);
    await RateRepository.initializeRate(rates);
    await UserRepository.initializeUser(users);
    await OriginRepository.initializeOrigin(origins);

    console.log(`🚀  Server ready at ${url}`);
  });
};
