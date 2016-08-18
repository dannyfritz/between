import sourcemaps from "rollup-plugin-sourcemaps"
import eslint from "rollup-plugin-eslint"
import nodeResolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"

export default {
  entry: "src/index.js",
  dest: "dist/bundle.js",
  format: "iife",
  moduleName: "between",
  sourceMap: true,
  plugins: [
    eslint(),
    sourcemaps(),
    nodeResolve(),
    commonjs(),
  ],
}
