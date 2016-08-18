import gulp from "gulp"

const webpack = require("webpack-stream")
gulp.task("default", function()
{
  return gulp.src("src/entry.js")
    .pipe(webpack())
    .pipe(gulp.dest("dist/"))
})
