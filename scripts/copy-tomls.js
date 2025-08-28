const { readdirSync, copyFileSync } = require("node:fs");
const { resolve } = require("node:path");

const root = resolve(__dirname, "..");
const packagesPath = resolve(root, "packages");
const dirs = readdirSync(packagesPath);

for (const dir of dirs) {
  const src = resolve(packagesPath, dir);
  const files = readdirSync(src);

  if (!files.includes("resource.toml")) continue;

  const toml = "resource.toml";
  const dest = resolve(root, "resources", dir);

  copyFileSync(resolve(src, toml), resolve(dest, toml));

  log(src, dest, toml);
}

function log(src, dest, file) {
  const _src = src.split("\\").slice(-2).join("/");
  const _dest = dest.split("\\").slice(-2).join("/");

  console.log(`Copied ${file} from ${_src} -> ${_dest}`);
}
