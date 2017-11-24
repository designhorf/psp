'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    sassLint = require('gulp-sass-lint'),
    browserSync = require('browser-sync').create(),
    stylesheets = './assets/stylesheets/**/*.scss',
    destination = './dist';


gulp.task('autoprefixer', function () {
    var cssDest = destination + '/stylesheets';
    return gulp.src(cssDest)
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'], cascade: false })]))
        .pipe(gulp.dest(cssDest));
});

gulp.task('clean', function () {
    return gulp.src(destination + '/*')
        .pipe(clean());
});

gulp.task('sass', function () {
    return gulp.src(stylesheets)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream());
});

gulp.task('sasslint', function () {
    return gulp.src(stylesheets)
        .pipe(sassLint({
            options: {
                formatter: 'stylish',
                'merge-default-rules': false
            },
            files: {
                ignore: '**/*.scss'
            },
            rules: {
                'no-ids': 1,
                'no-mergeable-selectors': 0
            },
            configFile: './config/.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});


gulp.task('watch', function() {
    browserSync.init({
        files: ['index.html'],
        proxy: 'localhost:8111'
    });
    gulp.watch(stylesheets, ['sasslint', 'sass', 'autoprefixer']);
});

gulp.task('default', function() {
    runSequence(
            'clean',
            ['sasslint', 'sass'],
            'autoprefixer'
    );
});
