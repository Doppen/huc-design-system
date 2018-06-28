var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    md   = require('gulp-remarkable'),
    imageResize = require('gulp-image-resize'),
    replace = require('gulp-replace');
    useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
const using = require('gulp-using');

// DATA
var siteJson = require('./content/data/site.json');

var options = {
    batch : ['./src/components', './prebuild']
    }

//files
var dst = '_dist';
var prebuild = 'prebuild';
var fScss= 'src/scss/**/*.scss';
var fHtml= 'src/**/*.html';
var fImages= 'src/images/**/*';
var fJs= 'src/js/**/*';
var fJson= 'src/**/*.json';
var fMd= 'content/**/*.md';



//browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '_dist'
    },
    browser: ["google chrome"], //, "firefox"
  })
})



////////////////    IMAGES
gulp.task('images-big', function () {
  return gulp.src(['content/images/**/*'])
    .pipe(using())
    .pipe(imageResize({
      width : 900,
      quality: .9,
      noProfile: true
    }))
    .pipe(gulp.dest(prebuild+'/images/content'))
});


gulp.task('images-small', ['images-big'], function () {
  return gulp.src(['content/images/**/*'])
    .pipe(using())
    .pipe(imageResize({
      width : 500, //300
      quality: .85,
      noProfile: true
    }))
    .pipe(rename(function (path) {
      path.basename += "-small";
    }))
    .pipe(gulp.dest(prebuild+'/images/content'))

});

gulp.task('img', ['images-small'], function () {
});




//////////////////   PREBUILD

gulp.task('preClean', function () {
    return gulp.src([prebuild+"/**/*.html", 'src/components/nav.html'], {read: false})
        .pipe(plumber())
        .pipe(clean({force: true}))
});



gulp.task('nav', ['preClean'], function() {
    return gulp.src('./src/templates/nav.html')
        .pipe(plumber())
        .pipe(handlebars(siteJson, options))
        .pipe(rename("nav.html"))
        .pipe(gulp.dest('src/components'));
});




gulp.task('convertMD', ['nav'], function () {
  return gulp.src("./content/**/*.md")
    .pipe(md())
    .pipe(rename(function (path) {
      path.extname = ".html";
    }))

    .pipe(gulp.dest(prebuild));

});




gulp.task('pre', ['convertMD'], function() {

});


//////////////////   SITE BUILD

  // clean all previous output
gulp.task('clean', ['pre'], function () {
    return gulp.src([dst], {read: false})
        .pipe(plumber())
        .pipe(clean({force: true}))
});




//create css from sass
gulp.task('sass', ['clean'], function() {
  return gulp.src(fScss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'/css'))

});

gulp.task('buildFromTemplates', ['sass'], function() {

        for(var i=0; i<siteJson.pages.length; i++) {
            var page = siteJson.pages[i],
                fileName = page.name.replace(/ +/g, '-').toLowerCase();
                template = page.template;

            gulp.src('./src/templates/'+template+'.html')
                .pipe(plumber())
                .pipe(handlebars(page, options))

                .pipe(rename(fileName + ".html"))
                .pipe(useref())
                .pipe(gulp.dest(dst));
        }
});


gulp.task('distAssets',['buildFromTemplates'], function() {
  gulp.src([fImages])
  .pipe(gulp.dest(dst+'/images'))

  gulp.src(['prebuild/images/content/*'])
  .pipe(gulp.dest(dst+'/images/content'))


})




// watch
gulp.task('watch', ['distAssets', 'browserSync'], function (){
  gulp.watch([fHtml, fScss, fJs, fJson, fMd], ['distAssets']);
  gulp.watch([fHtml, fScss, fJs, fJson, fMd], browserSync.reload);
});


gulp.task('default', ['watch']);
gulp.task('build', ['distAssets']);
