// Config
var config = {
  'cssBuildDir' : '_site/css/',
  'cssDir'      : 'css',
  'scssDir'     : 'sass',
  'jsBuildDir'  : '_site/js',
  'jsDir'       : 'js',
  'coffeeDir'   : 'coffee'
}

// Require
var gulp      = require('gulp'),
  browserSync = require('browser-sync'),
  cp          = require('child_process'),
  $           = require('gulp-load-plugins')();

// Tasks
gulp.task('sass', function(){
  gulp.src(config.scssDir + '/**/**.scss')
    .pipe($.sass({ errLogToConsole: true }))
    .pipe($.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest(config.cssBuildDir))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest(config.cssDir))
});

gulp.task('coffee', function(){
  gulp.src(config.coffeeDir + '/*.coffee')
    .pipe($.coffee({bare : true}).on('error', $.util.log))
    .pipe(gulp.dest(config.jsBuildDir))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest(config.jsDir))
});

gulp.task('jekyll', function(done){
  browserSync.notify('Compiling Jekyll');
  return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'}).on('close', done);

});

gulp.task('jekyll-rebuild', ['jekyll'], function(){
  browserSync.reload();
});

gulp.task('serve',['sass', 'coffee', 'jekyll'], function(){
  browserSync({
    server: {
      baseDir: '_site'
    }
  })
});

gulp.task('watch', function(){
  gulp.watch(config.scssDir + '/*.scss', ['sass']);
  gulp.watch(config.coffeeDir + '/*.coffee', ['coffee']);
  gulp.watch('**/*.html', ['jekyll-rebuild']);
});

gulp.task('default', ['serve', 'watch']);
