import { DataSource } from "typeorm";
import * as entities from "./entities/index.js";

export const DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "altv",
  synchronize: false,
  logging: true,
  migrations: ["./src/migrations/*.ts"],
  entities
});

export * from "./entities/index.js";
