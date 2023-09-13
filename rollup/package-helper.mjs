import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import * as A from "fp-ts/lib/Array.js";
import * as R from "fp-ts/lib/Record.js";
import * as O from "fp-ts/lib/Option.js";
import { pipe } from "fp-ts/lib/function.js";

const projectRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

async function readJSON(path) {
  const contents = await fs.readFile(path);
  return JSON.parse(contents);
}

async function getPackages() {
  const rootPackageJson = await readJSON(path.join(projectRoot, "package.json"))
  return rootPackageJson.workspaces;
}

async function getPackageInfo(packageLocation) {
  const packageJson = await readJSON(path.join(projectRoot, packageLocation, "package.json"));
  return {
    exports: packageJson.exports,
    name: packageJson.name.replace("@marlowe.io/", ""),
    location: packageLocation
  };
}

export function buildRollupInput(packageInfo) {
  return pipe(
    packageInfo.exports,
    R.toArray,
    A.filter(([exportKey, exportMap]) => !exportKey.includes("*")),
    A.map(([exportKey, exportMap]) => {
      const newKey = exportKey === "." ? packageInfo.name : exportKey.replace(/^\.\//, '');
      return [newKey, path.join(packageInfo.location, exportMap.import)]
    } ),
    R.fromEntries
  )
}

export async function getAllPackageInfo () {
  const pkgs = await getPackages();
  const packageInfos = await Promise.all(pkgs.map(getPackageInfo));
  // console.log(packageInfos)
  return packageInfos;
  // const packageLocation = 'packages/language/core/v1';
  // const p = await getPackageExports(packageLocation);
  // console.log(buildRollupInput(packageLocation, "language-core-v1", p));


}
// main();

