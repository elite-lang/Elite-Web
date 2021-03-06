var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

var watching = false;

gulp.on("stop", function() {
    if (!watching) {
        process.nextTick(function() {
            process.exit(0)
        });
    }
});

var options = {
    typeScript: {
        target: "app/js"
    },
    test: {
        source: "test/**/*.ts",
        target: "compiled/test"
    },
    sass: {
        source: ["stylesheets/*.scss", "decorators/*.scss"],
        target: {
            directory: "app/css/",
            fileName: "style.css"
        },
        config: {
            errLogToConsole: true
        }
    }
};

gulp.task("typescript", $.shell.task("tsc -p ./src/"));

gulp.task("browserify", ["build"], $.shell.task("browserify ./compiled/index.js" +
    " -o ./app/js/bundle.js"));

gulp.task("sass", function() {
    return gulp.src(options.sass.source)
        .pipe($.cached("sass"))
        .pipe($.sass(options.sass.config))
        .pipe($.concat(options.sass.target.fileName))
        .pipe(gulp.dest(options.sass.target.directory))
});

gulp.task("clean", function() {
    return require("del").sync([options.typeScript.target + "/**"]);
});

gulp.task("build", ["typescript", "sass"]);

gulp.task("default", ["browserify"]);
