import { DataSource, EntityTarget } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "vincentDubresson",
  password: "PandAMysqL69340!",
  database: "cuisine-di-panda",
  synchronize: true,
  entities: [__dirname + "/../models/**/**/*.entity.js"],
  logging: ["query", "error"],
});

let initialized = false;

export const getDatabase = async () => {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("#### - Successfully connected to database - ####");
  }
  return dataSource;
};

export const getRepository = async (entity: EntityTarget<any>) => {
  return (await getDatabase()).getRepository(entity);
};
