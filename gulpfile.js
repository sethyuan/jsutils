const gulp = require("gulp")
const babel = require("gulp-babel")
const del = require("del")
const changed = require("gulp-changed")
const sourcemaps = require("gulp-sourcemaps")
const mocha = require("gulp-spawn-mocha")

gulp.task("default", ["watch"])

gulp.task("clean", done => {
  return del(["lib"], done)
})

gulp.task("prod", ["transpile-for-release"])

gulp.task("watch", ["test"], () => {
  gulp.watch(["src/**/*.js", "test/**/*.js"], ["test"])
})

gulp.task("test", ["transpile-for-test"], () => {
  return gulp.src("test/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["es2015", "stage-2"]
    }))
    .pipe(sourcemaps.write())
    .pipe(mocha({
      ui: "bdd",
      require: ["babel-polyfill", "babel-register"]
    }))
})

gulp.task("transpile-for-test", () => {
  return gulp.src("src/**/*.js")
    .pipe(changed("lib"))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["es2015", "stage-2"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("lib"))
})

gulp.task("transpile-for-release", () => {
  return gulp.src("src/**/*.js")
    .pipe(changed("lib"))
    .pipe(babel({
      presets: ["es2015", "stage-2"]
    }))
    .pipe(gulp.dest("lib"))
})
