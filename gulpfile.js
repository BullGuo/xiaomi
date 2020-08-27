const gulp = require("gulp");
const scss = require("gulp-sass");
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");
const connect = require("gulp-connect");

// gulp.task("scss", function(){
//     return gulp.src("stylesheet/index.scss")
//     .pipe(scss())
//     .pipe(gulp.dest("dist/css"))
//     .pipe(minifycss())
//     .pipe(rename("index.min.css"))
//     .pipe(gulp.dest("dist/css"))
//     // .pipe(connect.reload());
// });

// //批量处理scss文件
// gulp.task("scssAll", function(){
//     return gulp.src("stylesheet/*.scss")
//     .pipe(scss())
//     .pipe(gulp.dest("dist/css"))
//     // .pipe(connect.reload());
// });

// //处理html文件
// gulp.task("copy-html", function(){
//     return gulp.src("*.html")
//     .pipe(gulp.dest("dist/"))
//     // .pipe(connect.reload());
// });

// //处理js文件
// gulp.task("scripts", function(){
//     return gulp.src(["*.js", "!gulpfile.js"])
//     .pipe(gulp.dest("dist/js"))
//     // .pipe(connect.reload());
// });

// //处理json数据
// gulp.task("data", function(){
//     return gulp.src(["*.json", "!package.json"])
//     .pipe(gulp.dest("dist/data"))
//     // .pipe(connect.reload());
// });

// //处理图片
// gulp.task("images", function(){
//     return gulp.src("images/**/*")
//     .pipe(gulp.dest("dist/images"))
//     // .pipe(connect.reload());
// });

// //一次性执行多个任务
// gulp.task("build", gulp.series("scss", "scssAll", "copy-html", "scripts", "data", "images"), function(){
//     console.log("任务执行完毕");
// });

//监听，如果监听到文件有改变，会自动去执行对应的任务，更新数据
gulp.task("watch", function(){
    gulp.watch("stylesheet/index.scss", function(){
        return gulp.src("stylesheet/index.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifycss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
    });
    gulp.watch(["stylesheet/*.scss"], function(){
        return gulp.src("stylesheet/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
    });
    gulp.watch("*.html", function(){
        return gulp.src("*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
    });
    gulp.watch(["*.js", "!gulpfile.js"], function(){
        return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    });
    gulp.watch(["*.json", "!package.json"], function(){
        return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());
    });
    gulp.watch("images/**/*", function(){
        return gulp.src("images/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
    });
});

//启动一个服务器
gulp.task("server", function(){
    connect.server({
        root: "dist",     //设置根目录
        port: 8887,       //设置端口号   0~65535之间
        livereload: true  //启动实施刷新功能
    })
})

//同时启动监听和服务
gulp.task("default", gulp.parallel('server', 'watch'));


//设置一个专门拷贝php数据的任务
// gulp.task("php", function(){
//     return gulp.src("*.php")
//     .pipe(gulp.dest("dist/php"))
    // .pipe(connect.reload());
// })