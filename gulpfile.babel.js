import {dest, series, src} from "gulp";
import insert from "gulp-insert";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import rename from "gulp-rename";
import uglify from "gulp-uglify-es";
import sourcemaps from "gulp-sourcemaps";
import del from "del";
import header from "gulp-header";
import fs from "fs";
import gulpTypescript from "gulp-typescript";
import typescript from "typescript";

const tsProject = gulpTypescript.createProject("tsconfig.json", {
    declaration: true,
    typescript: typescript
});

const copyFiles = () =>
    src(["README.md", "LICENSE", "package.json"])
        .pipe(dest("dist"));

const umd = () => {
    const outputPath = "dist/umd";

    const packageJson = JSON.parse(fs.readFileSync("./package.json"));
    const headerTxt = fs.readFileSync("./copyright-header.txt");

    return src("./src/index.ts")
        .pipe(webpackStream(require("./webpack.config.js"), webpack))
        .pipe(header(headerTxt, {package: packageJson}))
        .pipe(dest(outputPath));
};

const minifyUmd = () =>
    src("dist/umd/convergence-input-element-bindings.js")
        .pipe(sourcemaps.init())
        .pipe(uglify({
            output: {
                comments: "some"
            }
        }))
        .pipe(rename({extname: ".min.js"}))
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/umd"));

const commonjs = () =>
    src("src/*.ts")
        .pipe(tsProject())
        .js
        .pipe(dest("dist/lib"));

const typings = () =>
    src("src/*.ts")
        .pipe(tsProject())
        .dts.pipe(dest("dist/typings"));

const appendTypingsNamespace = () =>
    src("dist/typings/index.d.ts", {base: './'})
        .pipe(insert.append('\nexport as namespace ConvergenceInputElementBinder;\n'))
        .pipe(dest("./"));

const clean = () => del(["dist"]);

const dist = series([
    umd,
    minifyUmd,
    commonjs,
    typings,
    appendTypingsNamespace,
    copyFiles]);

export {
    dist,
    clean
}
