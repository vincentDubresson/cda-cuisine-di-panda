import { DataSource, EntityTarget } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "Cuisine-di-Panda.sqlite",
  synchronize: true,
  entities: [__dirname + "/../models/**.*.entity.js"],
  logging: ["query", "error"],
});

let initialized = false;

const getDatabase = async () => {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("#### - Successfully connected to database - ####");
  }
  return dataSource;
}

const getRepository = async (entity: EntityTarget<any>) => {
  return (await getDatabase()).getRepository(entity);
}

export { getDatabase, getRepository };