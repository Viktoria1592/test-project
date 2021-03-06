var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var bulkSass = require('gulp-sass-bulk-import');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var run = require('run-sequence');
var postcss = require("gulp-postcss");
var plumber = require('gulp-plumber');
var rigger = require('gulp-rigger');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

gulp.task('html', function () {
    gulp.src('app/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('build')) //Выгружаем результат в папку build
        .pipe(browserSync.reload({
            stream: true
        })) //И перезагрузим наш сервер для обновлений
});

gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(bulkSass()).pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(postcss([
      require('autoprefixer')
    ])).pipe(cssnano()) // Сжимаем
        .pipe(rename({
            suffix: '.min'
        })) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css')) // Выгружаем результата в папку build/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function () {
    return gulp.src(['app/js/**/*', '!app/js/data/**/*', '!app/js/data']) //при необходимости указываем нужные файлы библиотек
        .pipe(plumber()).pipe(concat('main.min.js')).pipe(gulp.dest('build/js')).pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('image', function () {
    return gulp.src('app/img/**/*').pipe(imagemin([
    imagemin.gifsicle({
            interlaced: true
        })

        , imagemin.jpegtran({
            progressive: true
        })

        , imagemin.optipng({
            optimizationLevel: 3
        })

        , imagemin.svgo({
            plugins: [
                {
                    removeViewBox: false
        }
            ]
        })
])).pipe(gulp.dest('build/img')).pipe(browserSync.reload({
        stream: true
    }))
});
gulp.task('copy', function () {
    gulp.src('app/js/data/**/*').pipe(changed('build')).pipe(gulp.dest('build/js/data'))
});


gulp.task('clean', function () {
    return del('build/**/*')
});
gulp.task('build', function (fn) {
    run('clean',  'html', 'sass', 'scripts', 'image', 'copy', fn)
});


gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - build
        }
        , notify: false // Отключаем уведомления
    });
});
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/**/*.html', ['html']); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
    gulp.watch('app/img/**/*', ['image'])
});
gulp.task('default', function () {
    run('build', ['watch'])
});

