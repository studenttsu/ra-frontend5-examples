const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Задача:
// Берём файл
// Выполняем преобразования
// Выводим результат

// gulp.task('taskName', () => {
//     return gulp.src('source-files') // Выборка исходных файлов для обработки плагином
//         .pipe(plugin()) // Вызов Gulp плагина для обработки файла
//         .pipe(gulp.dest('folder')); //Вывод результата в папку назначения dest (destination - пункт назначения)
// });

// Таск компиляции sass в css
function buildSassDev() {
    return src('./src/scss/*')
        .pipe(sourcemaps.init())
            .pipe(sass({ includePaths: ['./node_modules'] }))
            .pipe(gcmq())
            .pipe(
                postcss([
                    autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
                    cssnano()
                ])
            )
        .pipe(sourcemaps.write())
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function buildSass() {
    return src('./src/scss/*')
        .pipe(sass())
        .pipe(gcmq())
        .pipe(
            postcss([
                autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
}

// Таск работы с html файлами
function buildHtml() {
    return src('./src/index.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Таск копирование статичных файлов
function copy() {
    return src(['./src/images/**/*.*'])
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

// Отслеживание изменений
function serve() {
    watch('src/scss/**/*.scss', buildSassDev);
    watch('src/index.html', buildHtml);
}

// Создание дев-сервера
function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    });
}

exports.build = series(cleanDist, parallel(buildSass, buildHtml, copy));
exports.default = series(buildSassDev, parallel(createDevServer, serve));