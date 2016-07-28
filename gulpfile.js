var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var AUTOPREFIXER_BROWSERS = [    
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// ### Sources / Destinations
var src = {
  js: 'src/js/*.js',
  js_vendor: 'src/js/vendor/*.js',
  scss: 'src/**/*.scss',
  scss_index: 'src/css/style.scss',
  img: 'images/**/**.**'
};
var dest = {
  js: 'dest/js',
  css: 'dest/css',
  img: 'dest/assets/images'
};

// ## Environment
var env = {
  dev: function() {
    return process.env.NODE_ENV === 'dev';
  },
  prod: function() {
    return process.env.NODE_ENV === 'prod';
  }
};

// checks for production environment for gulpif()
gulp.task('env:dev', function(cb){
    process.env.NODE_ENV = 'dev';
    cb(); /// ### this lets gulp know that this task is done
})

gulp.task('env:prod', function(cb){
    process.env.NODE_ENV = 'prod';
    cb(); /// ### this lets gulp know that this task is done
})

// ## Subtasks (scripts, css, img)
gulp.task('js', function(){
    gulp.src(src.js)
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('default'))
        .pipe($.if(env.dev(), $.sourcemaps.init({loadMaps: true})))
        .pipe($.concat('main.js'))
        .pipe($.if(env.prod(), $.rename('main.min.js')))
        .pipe($.if(env.prod(), $.uglify()))
        .pipe($.if(env.dev(), $.sourcemaps.write('./')))
        .pipe(gulp.dest(dest.js))
        .pipe(browserSync.reload({stream: true}));

    // ## Concats + uglifies vendor js files    
    gulp.src(src.js_vendor)
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(dest.js))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('css', function() {
    gulp.src(src.scss_index)
        .pipe($.if(env.dev(), $.plumber()))
        .pipe($.if(env.dev(), $.sourcemaps.init()))
        .pipe($.if(env.dev(), $.sass().on('error', $.sass.logError)))
        .pipe($.if(env.prod(), $.sass({ outputStyle: 'compressed' })))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.if(env.prod(), $.cssnano()))
        .pipe($.rename('style.min.css'))
        .pipe($.if(env.dev(), $.sourcemaps.write('./')))
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.stream());
})

gulp.task('img', function(){
    gulp.src(src.img)
        .pipe($.imagemin())
        .pipe(gulp.dest(dest.img));
})

gulp.task('serve', function() {
  browserSync.init({
    ghostMode: false,
    server: {
      baseDir: './',
      open: true
    },
    port: 3001
  });
});

// ## Main tasks

// Build tasks
gulp.task('build', ['js', 'css']);
gulp.task('build:dev', function(cb) {
    runSequence('env:dev', 'build', cb);
});
gulp.task('build:prod', function(cb) {
    runSequence('env:prod', 'build', cb);
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(src.scss, ['css']);
    gulp.watch(src.js, ['js']);
    //gulp.watch(src.img, ['img']);
})

// Default tasks
gulp.task('default', function(cb){
    runSequence('env:dev', 'build', 'serve','watch', cb);
})


