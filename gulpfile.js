var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn"),
  scss = require("gulp-scss"),
  concatCSS = require('gulp-concat-css'),
  rename =  require('gulp-rename'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass');

//запуск локального сервера
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});

// Работа с html 
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// Работа с CSS 
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

// Работа со сборкой CSS 
gulp.task('scss', function () {
  gulp.src('./app/css/blocks/*.scss')
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./app/css/')) 
    .pipe(connect.reload());
});

// Работа с js
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Слежка 
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/js/*.js'], ['js']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/css/blocks/*.scss'], ['scss']);
});
 
// задача по умолчанию 
gulp.task('default', ['connect', 'watch'],function () {
  gulp.src('./app/css/blocks/*.scss')
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./app/css/'))  
    
    .pipe(connect.reload());
});

