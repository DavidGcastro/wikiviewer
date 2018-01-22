var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var cssImport = require("postcss-import");
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var cssnano = require('cssnano');
var simpleVars = require('postcss-simple-vars');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var mixins = require('postcss-mixins');




//all my watch tasks
gulp.task('watch', function () {
    browserSync.init({
        //where should i go?
        server: {
            baseDir: 'app'
        }

    });


    watch('./app/index.html', function () {
        //        console.log('HTML change detected')
        browserSync.reload();
    });


    watch('./app/styles/modules/*.css', function () {
        gulp.start('cssInject');
    });


    watch('./app/js/scripts/*js', function () {
        gulp.start('scripts');
        browserSync.reload();
    });
});




//browsersync styles, styles is dependency so it will run and complete first

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/styles/temp/source.css')
        .pipe(browserSync.stream());
});





//copy html to dist
gulp.task('copyhtml', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});


//modify and minify CSS

gulp.task('styles', function () {
    var postcss_stuff = [
       cssImport,
       mixins,
       nested,
       autoprefixer,
       cssnano,
       simpleVars
    ];


    return gulp.src('./app/styles/source.css')
        .pipe(postcss(postcss_stuff))
        .pipe(gulp.dest('./app/styles/temp/'))
    //        .pipe(browserSync.stream()); //live reload of compiled css

});


//make images smaller
gulp.task('imagemin', () =>
    gulp.src('./app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('temp/images'))
);



//combine  and minify js

gulp.task('scripts', function () {
    return gulp.src('./app/js/scripts/*js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/'));
})

gulp.task('default', ['copyhtml', 'styles', 'imagemin', 'scripts']);
