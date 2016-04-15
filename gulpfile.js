'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify'),
    watchify   = require("watchify"),
    babelify   = require("babelify"),
    envify     = require("envify"),
    lrload     = require("livereactload");

function createBundler(useWatchify) {
    return browserify({
        entries: './src/Views/main/main.js',
        debug: true,
        plugin: useWatchify ? [ lrload ] : [],
        // defining transforms here will avoid crashing your stream
        transform: [[babelify, {}], [envify, {}], reactify],
        fullPath: true
    });
}

gulp.task('build', function () {
    // set up the browserify instance on a task basis
    var b = createBundler(false);

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    var bundler = createBundler(true)
    var watcher = watchify(bundler)
    rebundle()
    return watcher
        .on("error", gutil.log)
        .on("update", rebundle)

    function rebundle() {
        gutil.log("Update JavaScript bundle")
        watcher
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .on('error', gutil.log)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/js'));
    }
})