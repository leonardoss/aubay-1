'use strict';

var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connectPHP = require('gulp-connect-php'),
    gUtil = require('gulp-util'),
    imageMin = require('gulp-imagemin'),
    minify = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence').use(gulp),
    shell = require('gulp-shell'),
    sourceMaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify-es').default,
    png = require('imagemin-pngquant');

var browserList = ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 8', 'android 4'];

gulp.task('server', function () {
    connectPHP.server({ base: 'site' }, function () {
        browserSync.init({
            proxy: 'localhost:8000',
            port: 3000,
            reload: 200,
            notify: false
        });
    });

    gulp.watch('**/*.php').on('change', function () {
        browserSync.reload();
    });
});

gulp.task('images', function () {
    return gulp.src(['site/images/*.jpg', 'site/images/*.png'])
        .pipe(plumber())
        .pipe(imageMin({ progressive: true, use: [png()] }))
        .on('error', gUtil.log)
        .pipe(gulp.dest('site/images'));
});

gulp.task('images-deploy', function() {
    gulp.src('site/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function() {
    return gulp.src('site/scripts/js/**/*.js')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(concat('site.js'))
        .pipe(sourceMaps.write('../maps'))
        .on('error', gUtil.log)
        .pipe(gulp.dest('site/scripts'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts-deploy', function() {
    return gulp.src('site/scripts/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function () {
    return gulp.src('site/styles/sass/init.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourceMaps.init())
        .pipe(sass({ errLogToConsole: true, includePaths: ['site/styles/sass'] }))
        .pipe(autoPrefixer({ browsers: browserList, casacade: true }))
        .on('error', gUtil.log)
        .pipe(concat('styles.css'))
        .pipe(sourceMaps.write('../maps'))
        .pipe(gulp.dest('site/styles'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles-deploy', function() {
    return gulp.src('site/styles/sass/init.scss')
        .pipe(plumber())
        .pipe(sass({ includePaths: ['site/styles/sass'] }))
        .pipe(autoPrefixer({ browsers: browserList, cascade: true }))
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('sources', function() {
    gulp.src('site/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));

    gulp.src('site/.*')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));

    gulp.src('site/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('site/includes/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/includes'));

    gulp.src('site/php/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/php'));
});

gulp.task('clean', function() {
    return shell.task([
        'rm -rf dist'
    ]);
});

gulp.task('scaffold', function() {
    return shell.task([
        'mkdir dist',
        'mkdir dist/fonts',
        'mkdir dist/images',
        'mkdir dist/includes',
        'mkdir dist/php',
        'mkdir dist/scripts',
        'mkdir dist/styles'
    ]);
});

gulp.task('default', ['server', 'scripts', 'styles'], function () {
    gulp.watch('site/scripts/js/**', ['scripts']);
    gulp.watch('site/styles/sass/**', ['styles']);
});

gulp.task('deploy', sequence('clean', 'scaffold', ['scripts-deploy', 'styles-deploy', 'images-deploy'], 'sources'));
