//引入
var gulp = require('gulp');
//编译SASS
var sass = require('gulp-sass');
//合并JS
var concat = require('gulp-concat');
//压缩JS
var uglify = require('gulp-uglify');
//检查js有无报错或警告
var jshint = require('gulp-jshint');
//
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var fs = require("fs");
var path = require('path');
var config = require('./config');
var company = config.company;
var devDir = config.dev_dir;
var staticDir = config.static_dir;
var baseDir = "./public/" + company;
var fileType = ["html", "hbs", "gif", "png", "jpg", "ico", "eot", "svg", "ttf", "woff"];

//配置文件路径
var pathsObj = {
    sass: baseDir + "/" + devDir + "/sass/style/*.scss", //sass文件
    css: baseDir + "/" + staticDir + "/css", //css文件夹

    fromJs: baseDir + "/" + devDir + "/js",//需要合并的JS文件夹
    toJs: baseDir + "/" + staticDir + "/js",//合并成的新JS所在的文件夹
    jsLint: baseDir + "/" + staticDir + "/js/**/*.js",//合并成的新JS所在的文件夹

    fromImg: baseDir + "/" + devDir,//需要合并和移动的图片文件，字体文件，html文件
    toImg: baseDir + "/" + staticDir,//图片文件，字体文件，html文件需要移动到的位置
};

//Sass编译任务
gulp.task('compile-sass', function () {
    gulp.src([pathsObj.sass])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(pathsObj.css));
});

//合并JS  配置需要把那些JS合并成一个新的JS
gulp.task('concat-scripts', function () {
    var arr = require(pathsObj.fromJs + '/hna-concat-scripts-config');
    for (var a = 0, a1 = arr.length; a < a1; a++) {
        var listJs = arr[a].listJs.map(function (item) {
            return pathsObj.fromJs + "/" + item;
        });

        if (config.env == "production") {
            gulp.src(listJs)
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(concat(arr[a].newJs))
                .pipe(uglify())
                .pipe(gulp.dest(pathsObj.toJs));
        } else {
            gulp.src(listJs)
                //.pipe(jshint())
                //.pipe(jshint.reporter('default'))
                .pipe(concat(arr[a].newJs))
                .pipe(gulp.dest(pathsObj.toJs));
        }
    }

    if (config.env == "production") {
        gulp.src(pathsObj.fromJs + '/**/!([h][n][a][-])*.js')   //匹配所有js文件，但排除掉以hna开头的js文件
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(uglify())
            .pipe(gulp.dest(pathsObj.toJs));
    } else {
        gulp.src(pathsObj.fromJs + '/**/!([h][n][a][-])*.js')   //匹配所有js文件，但排除掉以hna开头的js文件
            //.pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(gulp.dest(pathsObj.toJs));
    }
    //单独移动jquery，不压缩
    gulp.src(pathsObj.fromJs + '/**/hna-jquery-1.9.1.min.js')
        .pipe(gulp.dest(pathsObj.toJs));
    gulp.src(pathsObj.fromJs + '/**/hna-highcharts.min.js')
        .pipe(gulp.dest(pathsObj.toJs));
    gulp.src(pathsObj.fromJs + '/**/hna-qrcode.min.js')
        .pipe(gulp.dest(pathsObj.toJs));
});
// 检查js语法错误
gulp.task('jslint', function () {
    gulp.src(pathsObj.jsLint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//压缩html img font文件
gulp.task('transfer-htmlImgFont', function () {
    var fileArr = [];
    for (var a = 0, a1 = fileType.length; a < a1; a++) {
        fileArr.push(pathsObj.fromImg + '/**/*.' + fileType[a]);
    }
    gulp.src(fileArr)
        .pipe(gulp.dest(pathsObj.toImg));
});

//自动压缩合并编译的任务
gulp.task('auto-release', ['compile-sass', 'concat-scripts', "transfer-htmlImgFont"], function () {
    gulp.watch(pathsObj.fromJs + '/**/*.scss', ['sass'])
    gulp.watch(pathsObj.fromJs + '/**/*.js', ['concat-scripts']);
    for (var a = 0, a1 = fileType.length; a < a1; a++) {
        gulp.watch(pathsObj.fromImg + '/**/*.' + (fileType[a]) + '', ['html-img-font']);
    }
    var files = [pathsObj.fromImg + '/'];
    browserSync.init(null, {
        proxy: config.server_host,
        files: files,
        browser: 'chrome',
        notify: false,
        port: config.port
    });
    gulp.watch(files).on("change", reload);
});

//自动压缩合并编译的任务
gulp.task('run-all', ['compile-sass', 'concat-scripts', "transfer-htmlImgFont"], function () {

});