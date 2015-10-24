'use strict'
// import gulp and gulpfile dependencies
import gulp        from 'gulp';
import babel       from 'gulp-babel';

// import general dependencies
import notify      from 'gulp-notify';
import sourcemaps  from 'gulp-sourcemaps';
import plumber     from 'gulp-plumber';
import rename      from 'gulp-rename';
import del         from 'del';

// import server dependencies
import browserSync from 'browser-sync';

// import JS task dependencies
import uglify      from 'gulp-uglify';
import browserify  from 'browserify';
import babelify    from 'babelify';
import streamify   from 'gulp-streamify';
import source      from 'vinyl-source-stream';

// import testing dependencies
import jasmine     from 'gulp-jasmine';
import reporters    from 'jasmine-reporters';

// import CSS dependencies
import minifyCSS   from 'gulp-minify-css';
import prefixer    from 'gulp-autoprefixer';
import compass     from 'gulp-compass';

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
    assets: 'public/assets',
    tests: 'test/*_spec.js'
};

gulp.task('spec', function() {
    gulp.src(paths.tests)
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        }));
});

gulp.task('scripts', function() {
    // gulp.src(paths.js)
    browserify('src/js/main.js', {debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function (err) { console.log('Error : ' + err.message); })
        .pipe(source('bundle.js'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // prevents an error from stopping gulp
        .pipe(streamify(sourcemaps.init()))
        .pipe(streamify(uglify()))
        .pipe(rename({
            basename: "main",
            suffix: ".min",
            extname: ".js"
          }))
        .pipe(streamify(sourcemaps.write('./')))
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

gulp.task('server', ['css', 'spec'], function() {

    browserSync({
        server: "./public/",
        port: 3013

    });

    gulp.watch(paths.js, ['scripts', 'spec']);
    gulp.watch(paths.tests, ['spec']);
    gulp.watch(paths.allscss, ['css']);
    gulp.watch(paths.html).on('change', reload);
});


gulp.task('default', ['delete', 'css', 'scripts', 'server'], function () {
});