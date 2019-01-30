var syntax        = 'scss'; // Syntax: sass or scss;
var distDir       = 'dist';

var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require("gulp-notify"),
    rsync         = require('gulp-rsync'),
    pug           = require('gulp-pug'),
    clean         = require('gulp-clean'),
    imagemin      = require('gulp-imagemin');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: distDir
        },
        notify: false,
        // open: false,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    });
});

gulp.task('pug', function () {
    return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.stream())
});

gulp.task('styles', function() {
    return gulp.src('src/'+syntax+'/**/*.'+syntax+'')
    .pipe(sass({ outputStyle: 'nested' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest(`${distDir}/css`))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/ripple/ripple.min.js',
        'src/js/common.js', // Always at the end
        ])
    .pipe(concat('scripts.min.js'))
//    .pipe(uglify()) // Mifify js (opt.)
    .pipe(gulp.dest(`${distDir}/js`))
    .pipe(browserSync.stream())
});

gulp.task('rsync', function() {
    return gulp.src('src/**')
    .pipe(rsync({
        root: distDir,
        hostname: 'username@yousite.com',
        destination: 'yousite/public_html/',
        // include: ['*.htaccess'], // Includes files to deploy
        exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
        recursive: true,
        archive: true,
        silent: false,
        compress: true
    }))
});

gulp.task('image', function() {
    return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(`${distDir}/img`))
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest(`${distDir}/fonts`))
});

gulp.task('cleanDist', function () {
    return gulp.src(distDir, {read: false, allowEmpty: true})
    .pipe(clean());
});

gulp.task('build', ['pug', 'styles', 'js', 'image', 'fonts'], function(done) {
    done()
});

gulp.task('watch', ['build', 'browser-sync'], function() {
    gulp.watch('src/**/*.pug', ['pug'], browserSync.reload);
    gulp.watch('src/**/*.'+syntax+'', ['styles'], browserSync.reload);
    gulp.watch(['libs/**/*.js', 'src/js/common.js'], ['js'], browserSync.reload);
    gulp.watch('src/img/**/*', ['image'], browserSync.reload);
    gulp.watch('src/fonts/**/*', ['fonts'], browserSync.reload);
});

gulp.task('default', ['watch']);
