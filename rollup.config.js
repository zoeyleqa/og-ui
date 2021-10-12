import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";

const packageJson = require("./package.json");

export default {
  // entry point for Rollup for our component library
  input: "src/index.ts",
  // output key indicates what types of output files will be generated at which place
  output: [
    {
      file: packageJson.module,
      format: "esm"
    },
    {
      file: packageJson.main,
      format: "umd",
      name: "OgUiLib",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        url: "url"
      }
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: [".css"]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true
    })
  ],
  watch: "src/**"
};
