'use strict'

import gulp        from 'gulp';
import babel       from 'gulp-babel';
import uglify      from 'gulp-uglify';
import rename      from 'gulp-rename';
import del         from 'del';
import minifyCSS   from 'gulp-minify-css';
import sourcemaps  from 'gulp-sourcemaps';
import eslint      from 'gulp-eslint';
import plumber     from 'gulp-plumber';
import prefixer    from 'gulp-autoprefixer';
import cache       from 'gulp-cached';
import remember    from 'gulp-remember';
import concat      from 'gulp-concat';
import compass     from 'gulp-compass';
import browserSync from 'browser-sync';
import notify      from 'gulp-notify';

const reload      = browserSync.reload;
const lintOptions = {
    rulePath: "./",
    useEslintrc: true
};

const paths = {
    js: 'src/js/*.js',
    basescss: 'src/scss/base.scss',
    allscss: 'src/scss/*.scss',
    html: 'public/index.html',
    assets: 'public/assets'
}

gulp.task('scripts', function() {
    gulp.src(paths.js)
        .pipe(cache('js'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // prevents an error from stopping gulp
        .pipe(eslint(lintOptions))  // next 3 are for eslint
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(remember('js'))
        .pipe(concat('main.js', {newLine: ';'}))
        // .pipe(uglify())
        .pipe(rename({
            basename: "main",
            suffix: ".min",
            extname: ".js"
          }))
        .pipe(sourcemaps.write('./'))
        .pipe(notify({message: "Generated file: <%= file.relative %>"}))
        .pipe(gulp.dest(paths.assets))
        .pipe(reload({stream: true}));
    });

gulp.task('css', function() {
    gulp.src(paths.basescss)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(compass({
            sass: 'src/scss',
            css: paths.assets
            }))
        .pipe(prefixer(['last 2 versions']))
        .pipe(gulp.dest(paths.assets))
        .pipe(minifyCSS())
        .pipe(rename({
            basename: "style",
            suffix: ".min",
            extname: ".css"
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(notify({message: "Generated file: <%= file.relative %>"}))
        .pipe(gulp.dest(paths.assets))
        .pipe(reload({stream: true}));
    });

gulp.task('delete', function() {
        del(['public/assets/*'], function(error) {
                console.log('Error on delete: ' + error);
            });
    });

gulp.task('server', ['css'], function() {

    browserSync({
        server: "./public/",
        port: 3013

    });

    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.allscss, ['css']);
    gulp.watch(paths.html).on('change', reload);
});


gulp.task('default', ['delete', 'css', 'scripts', 'server']);