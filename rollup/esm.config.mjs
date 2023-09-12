import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import outputSize from "rollup-plugin-output-size";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

const outputDir = "dist/";
const nodePlugin = nodeResolve({ browser: true });

function isExternal(id, parentId, isResolved) {
  const isExternal = id.includes("lucid-cardano") || id.includes("@marlowe.io");
  // console.error(
  //   `id: ${id}, parentId: ${parentId}, isResolved: ${isResolved}, isExternal ${isExternal}`
  // );
  return isExternal;
}

const plugins = [nodePlugin, commonjs(), outputSize(), visualizer()];

const packageConfig = format => (inputPath, outputPath) => ({
    input: inputPath,
    external: isExternal,
    output: {
      dir: path.join(outputDir, outputPath, format),
      format: format,
    },
    plugins,
  });

const packagesConfig = {
  wallet: {
    browser: "packages/wallet/dist/browser/index.js",
    api: "packages/wallet/dist/api.js",
  }

}

export default [
  packageConfig("esm")(
    {
      browser: "packages/wallet/dist/browser/index.js",
      api: "packages/wallet/dist/api.js",
    },
    "wallet"
  ),
  packageConfig("esm")("packages/runtime/core/dist/index.js", "runtime-core"),
  packageConfig("esm")(
    "packages/runtime/lifecycle/dist/index.js",
    "runtime-lifecycle"
  ),
  packageConfig("esm")(
    {
      "runtime-rest-client": "packages/runtime/client/rest/dist/index.js",
      transaction:
        "packages/runtime/client/rest/dist/contract/transaction/index.js",

      withdrawal: "packages/runtime/client/rest/dist/withdrawal/index.js",
    },
    "runtime-rest-client"
  ),
  packageConfig("esm")({
    adapter: "packages/adapter/dist/index.js",
    "time": "packages/adapter/dist/time.js",
    codec: "packages/adapter/dist/codec.js",
    file: "packages/adapter/dist/file.js",
    http: "packages/adapter/dist/http.js",
    "fp-ts": "packages/adapter/dist/fp-ts.js",
    }, "adapter"),
  packageConfig("esm")(
    {
      "language-core-v1":
        "packages/language/core/v1/dist/semantics/contract/index.js",
      next: "packages/language/core/v1/dist/semantics/next/index.js",
      environment: "packages/language/core/v1/dist/semantics/environment.js",
      state: "packages/language/core/v1/dist/semantics/state.js",
      token:
        "packages/language/core/v1/dist/semantics/contract/common/token.js",
      tokenValue: "packages/language/core/v1/dist/semantics/contract/common/tokenValue.js",
      version: "packages/language/core/v1/dist/semantics/version.js",
      examples: "packages/language/core/v1/dist/examples/index.js"
    },
    "language-core-v1"
  ),
  packageConfig("cjs")(
    {
      "language-core-v1":
        "packages/language/core/v1/dist/semantics/contract/index.js",
      next: "packages/language/core/v1/dist/semantics/next/index.js",
      environment: "packages/language/core/v1/dist/semantics/environment.js",
      state: "packages/language/core/v1/dist/semantics/state.js",
      token:
        "packages/language/core/v1/dist/semantics/contract/common/token.js",
      tokenValue: "packages/language/core/v1/dist/semantics/contract/common/tokenValue.js",
      version: "packages/language/core/v1/dist/semantics/version.js",
      examples: "packages/language/core/v1/dist/examples/index.js"
    },
    "language-core-v1"
  ),
];
