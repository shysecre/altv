import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./types";

const PostgreSQLDialect = new PostgresDialect({
  pool: new Pool({
    database: "altv",
    host: "localhost",
    user: "root",
    password: "root",
    port: 5432
  })
});

export const db = new Kysely<DB>({ dialect: PostgreSQLDialect });
