var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const buildHtml = require('./build/index');
// 静态服务器
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './docs',
      port: 9006
    }
  });
});
gulp.task('md-parse', function() {
  buildHtml();
});

gulp.task('default', ['server'], function() {
  gulp.watch('docs-md/**/*.md', ['md-parse']);
  gulp.watch('./docs/*.html', browserSync.reload);
});
