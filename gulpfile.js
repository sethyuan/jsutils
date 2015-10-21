"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("default", ["min"]);

gulp.task("min", function() {
  return gulp.src("lib/**/*.js")
    .pipe(concat("jsutils.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});
