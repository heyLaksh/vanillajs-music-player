const { src, watch, series } = require('gulp')
const terser = require('gulp-terser');
const browserSync = require('browser-sync');


// Js Task
function jsTask(){
    return src('app/js/script.js', { sourcemaps: true})
     .pipe(terser())
}

function browserSyncServe(cb){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browserSyncReload(cb){
    browserSync.reload();
    cb();
}

// Watch task
function watchTask(){
    watch('*.html', browserSyncReload);
    watch(['app/css/**/*.css', 'app/js/**/*.js'], series(jsTask, browserSyncReload)); 
}

//Default gulp task
exports.default = series(
    jsTask,
    browserSyncServe,
    watchTask
);