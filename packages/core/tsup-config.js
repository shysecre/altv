import { defineConfig } from "tsup";
import packageJson from "./package.json";

const isDev = () => process.env.NODE_ENV === "dev";
const watch = isDev();
const minify = !isDev();

const resourceName = __dirname.split("\\").pop();

export default defineConfig([
  {
    entry: ["./server/index.ts"],
    outDir: `../../resources/${resourceName}/server/`,
    bundle: true,
    format: "esm",
    external: [...Object.keys(packageJson.dependencies), "alt-server"],
    noExternal: Object.keys(packageJson.devDependencies),
    clean: true,
    splitting: false,
    dts: false,
    minify,
    watch
  },
  {
    entry: ["./client/index.ts"],
    outDir: `../../resources/${resourceName}/client/`,
    bundle: true,
    format: "esm",
    external: [...Object.keys(packageJson.dependencies), "alt-client"],
    noExternal: Object.keys(packageJson.devDependencies),
    clean: true,
    splitting: false,
    dts: false,
    minify,
    watch
  }
]);
