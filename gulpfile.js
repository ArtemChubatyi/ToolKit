const syntax = "scss"; // Syntax: sass or scss;

const gulp = require("gulp");
const gutil = require("gulp-util");
const clean = require("gulp-clean");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const rsync = require("gulp-rsync");
const pug = require("gulp-pug");

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./docs"
    },
    notify: false
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true,
    // tunnel: "projectname",
    // Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task("pug", () =>
  gulp
    .src("src/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("docs/"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("styles", () =>
  gulp
    .src(`src/${syntax}/*.${syntax}`)
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest("docs/css/"))
    .pipe(browserSync.stream())
);

gulp.task("js", () =>
  gulp
    .src("src/js/**/*.js") // Always at the end
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("docs/js/"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("images", () =>
  gulp
    .src("src/img/**")
    .pipe(gulp.dest("docs/img"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("fonts", () =>
  gulp
    .src("src/fonts/**")
    .pipe(gulp.dest("docs/fonts/"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("libs", () =>
  gulp
    .src(["src/libs/**"])
    .pipe(gulp.dest("docs/libs/"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("watch", ["pug", "styles", "js", "fonts", "images", "libs"], () => {
  gulp.watch("src/index.pug", ["pug"]);
  gulp.watch(`src/**/*.${syntax}`, ["styles"]);
  gulp.watch(["src/js/**/*.js"], ["js"]);
});

gulp.task("default", ["browser-sync", "watch"]);
