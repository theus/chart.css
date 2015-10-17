var gulp        = require('gulp'),
sass            = require('gulp-sass'),
prefix          = require('gulp-autoprefixer'),
minifycss       = require('gulp-minify-css'),
rename          = require('gulp-rename'),
plumber         = require('gulp-plumber'),
filesize        = require('gulp-filesize'),
watch           = require('gulp-watch');

gulp.task('default', function() {
  gulp.start(['sass', 'watch']);
});

gulp.task('sass', function() {
  // SASS
  gulp.src(['assets/sass/*.{scss,sass}', '!assets/sass/_*'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(prefix('last 3 version'))
  .pipe(gulp.dest('assets/css'))
  .pipe(filesize())
  .pipe(minifycss())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('assets/css'))
  .pipe(filesize())
});

gulp.task('watch', function(){

  watch(['assets/sass/*.{scss,sass}', '!assets/sass/_*'], function(){ 
    gulp.start('sass');
  });

  watch('assets/sass/_*.{sass,scss}', function(){ 
    setTimeout(function() {
      gulp.start('sass');
    }, 100);
  });

}); 

gulp.task('build', function(){
  // dist
  gulp.src(['assets/css/*.min.css'])
    .pipe(rename("chart.css"))
    .pipe(gulp.dest('build/dist/'));

  // src
  gulp.src(['assets/sass/**/*.{scss,sass}'])
    .pipe(gulp.dest('build/src/'));
});