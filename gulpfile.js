const gulp = require("gulp")
const babel = require("gulp-babel")
const mocha = require("gulp-spawn-mocha")

gulp.task("default", ["watch"])

gulp.task("watch", ["test"], () => {
  gulp.watch(["lib/**/*.js", "test/**/*.js"], ["test"])
})

gulp.task("test", () => {
  return gulp.src("test/**/*.js")
    .pipe(babel({
      presets: ["es2015", "stage-2"]
    }))
    .pipe(mocha({
      ui: "bdd",
      require: ["babel-polyfill", "babel-register"]
    }))
})
