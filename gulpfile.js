const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');

function buildSassDev() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({ includePaths: ['./node_modules'] }))
            .pipe(
                postcss([
                    autoprefixer({
                        grid: true,
                        overrideBrowserslist: ['last 2 versions']
                    }),
                    cssnano()
                ])
            )
        .pipe(sourcemaps.write())
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ includePaths: ['./node_modules'] }))
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                }),
                cssnano()
            ])
        )
        .pipe(dest('dist/css'));
}

function buildHtml() {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function buildJs() {
    return src('src/js/index.js')
      .pipe(webpackStream(require('./webpack.config')))
      .pipe(rename('main.min.js'))
      .pipe(dest('src/js'))
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream());
}

function copy() {
    return src(['src/images/**/*.*']).pipe(dest('dist/images'));
}

function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

function serve() {
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
    watch('src/scss/**/*.scss', buildSassDev);
    watch('src/**/*.html', buildHtml);
}

function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    });
}

exports.build = series(cleanDist, parallel(buildSass, buildHtml, copy, buildJs));
exports.default = series([buildSassDev, buildJs], parallel(createDevServer, serve));