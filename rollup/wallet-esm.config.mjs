import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import outputSize from 'rollup-plugin-output-size';
import { visualizer } from "rollup-plugin-visualizer";

const outputDir = 'dist/wallet/esm';
const nodePlugin = nodeResolve(
    { browser: true
    });

export default {
    input: 'packages/wallet/dist/browser/index.js',
    external: (id, parentId, isResolved) => {
      const isExternal = id.includes('lucid-cardano') || id.includes("@marlowe.io");
      console.error(`id: ${id}, parentId: ${parentId}, isResolved: ${isResolved}, isExternal ${isExternal}` );
      return isExternal;
    },
    output: {
        dir: outputDir,
        format: 'esm',
    },
    plugins:
        [ nodePlugin
        , commonjs()
        , outputSize()
        , visualizer()],
}
