import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { type DB } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "altv",
    port: 5432
  })
});

export const db = new Kysely<DB>({ dialect });
