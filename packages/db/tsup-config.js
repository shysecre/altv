import { defineConfig } from "tsup";

import packageJson from "./package.json";

const isDev = () => process.env.NODE_ENV === "dev";
const watch = isDev();
const resourceName = __dirname.split("\\").pop();

const external =
  "dependencies" in packageJson
    ? [...Object.keys(packageJson.dependencies), "kysely", "pg"]
    : ["kysely", "pg"];
const noExternal =
  "devDependencies" in packageJson
    ? Object.keys(packageJson.devDependencies)
    : [];

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    format: ["esm"],
    tsconfig: "./tsconfig.json",
    outDir: "./build",
    clean: true,
    sourcemap: true,
    splitting: false,
    dts: true,
    minify: false,
    external,
    noExternal,
    watch
  },
  {
    entry: ["./src/index.ts"],
    format: ["esm"],
    tsconfig: "./tsconfig.json",
    outDir: `../../resources/${resourceName}`,
    clean: true,
    sourcemap: false,
    splitting: false,
    dts: false,
    minify: false,
    external,
    noExternal,
    watch
  }
]);
