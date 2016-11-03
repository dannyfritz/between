import sourcemaps from "rollup-plugin-sourcemaps"
import eslint from "rollup-plugin-eslint"
import nodeResolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import nodeGlobals from "rollup-plugin-node-globals"
import json from "rollup-plugin-json"
import builtins from "rollup-plugin-node-builtins"
import replace from "rollup-plugin-replace"

export default {
  entry: "src/index.js",
  dest: "dist/between.js",
  format: "iife",
  moduleName: "between",
  sourceMap: true,
  plugins: [
    eslint(),
    sourcemaps(),
    builtins(),
    nodeResolve({ jsnext: true, main: true, browser: true }),
    commonjs({ ignoreGlobal: true }),
    nodeGlobals(),
    json(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
