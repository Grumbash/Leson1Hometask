"use strict";

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      fs = require('fs'),
      sass = require('gulp-sass'),
      server = require('browser-sync'),
      plumber = require('gulp-plumber'),
      prefix = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      map = require('gulp-sourcemaps'),
      glob = require('gulp-sass-glob'),
      rimraf = require('rimraf'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if'),
      cssmin = require('gulp-clean-css');

const paths = {
	distDir: 'dist/',
	devDir: {
		views: 'src/views/',
		styles:'src/styles/',
		serv: 'src/test.serv/'
	},
	modules: 'node_modules/'
}

/*******************************************/
			// DEVELOPER TASKS //			
/*******************************************/


/******* FONTS *******/

gulp.task('fonts', () => {
	return gulp.src([paths.modules + 'font-awesome/fonts/*.*'])
	.pipe(gulp.dest([paths.devDir.serv + 'fonts']))
	.pipe(server.stream());
});

gulp.task('fontsProd', () => {
	return gulp.src([paths.devDir.serv + 'fonts/*.*'])
	.pipe(gulp.dest([paths.distDir + 'fonts']));
});


/******* LIBRARIES *******/

gulp.task('libs', () => {
	return  gulp.src([paths.modules + 'normalize.css/normalize.css']);
			gulp.src([paths.modules + 'font-awesome/css/font-awesome.min.css'])
			.pipe(gulp.dest([paths.devDir.serv + 'libs']));	
});


/******* PUG *******/

gulp.task('pug', () => {
	return gulp.src([paths.devDir.views + '**/*.pug'])
	.pipe(plumber())
	.pipe(pug({
		// locals : JSON.parse(fs.readFileSync('content.json', 'utf8')), потом доработаю 
		pretty: true
	}))
	.pipe(gulp.dest(paths.devDir.serv))
	.pipe(server.stream());
});


/******* SASS *******/

gulp.task('sass', () => {
  return gulp.src([paths.devDir.styles + 'main.scss'])
  	.pipe(plumber())
  	.pipe(map.init())
  	.pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
			browsers : ['> 5%'],
			cascade : false
	}))
    .pipe(map.write())
    .pipe(gulp.dest([paths.devDir.serv + 'css']))
    .pipe(server.stream());
});


/******* WATCH *******/

gulp.task('watch', () => {
	gulp.watch(paths.devDir.views + '**/*.pug', gulp.series('pug'));
	// gulp.watch('content.json', gulp.series('pug'));
	gulp.watch(paths.devDir.styles + '**/*.scss', gulp.series('sass'));
});


/******* SERVER *******/

gulp.task('server', () => {
	server.init({
		port: 3000,
		server: {
			baseDir: paths.devDir.serv
		},
		notify: false
	});
});

/*******************************************/
			// PRODUCTION TASKS //			
/*******************************************/


/******* CLEAN *******/

gulp.task('clean', function(cb) {
	rimraf(paths.distDir, cb);
});


/******* CSS *******/

gulp.task('build', () => {
	return gulp.src(paths.devDir.serv + '*.html')
		.pipe( useref() )
		.pipe( gulpif('*.css', cssmin()) )
		.pipe( gulp.dest(paths.distDir) );
});


//default
gulp.task('default',gulp.series('libs', 'fonts', gulp.parallel('pug', 'server', 'watch', 'sass')));

//production 
gulp.task('prod', gulp.series('clean', 'build'));