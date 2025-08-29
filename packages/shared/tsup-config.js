import { defineConfig } from "tsup";

import packageJson from "../altv-data/package.json";

const isDev = () => process.env.NODE_ENV === "dev";
const watch = isDev();

const external =
  "dependencies" in packageJson ? Object.keys(packageJson.dependencies) : [];
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
  }
]);
