var gulp = require('gulp');
var sass = require('gulp-sass');
var apre = require('gulp-autoprefixer');
var sync = require('browser-sync').create();
var ugly = require('gulp-uglify');
var plmb = require('gulp-plumber');
var maps = require('gulp-sourcemaps');
var conc = require('gulp-concat');
var nano = require('gulp-cssnano');
var imgm = require('gulp-imagemin');
var gdel = require('del');
var reld = sync.reload;

var autoprefixerOptions = {
	browsers: ['last 3 versions', '> 5%', 'Firefox ESR']
};

gulp.task('normalize', function(){
	gulp.src('node_modules/normalize.css/normalize.css')
	.pipe(nano())
	.pipe(gulp.dest('css/vendors'))
});

//Styles task
gulp.task('styles', function(){
	gulp.src('scss/**/*.scss')
	.pipe(plmb())
	.pipe(maps.init())
	.pipe(sass({includePaths: ['scss']}))
	.pipe(apre(autoprefixerOptions))
	.pipe(nano())
	.pipe(maps.write('../css/maps'))
	.pipe(gulp.dest('css'));
});

//Uglify task
gulp.task('uglify', function(){
	gulp.src('js/*.js')
	.pipe(plmb())
	.pipe(maps.init())
	.pipe(ugly())
	.pipe(maps.write('../minjs/maps'))
	.pipe(gulp.dest('minjs'));
});

// task that ensures compiling is complete before
// reloading browsers
gulp.task('js-watch', ['uglify'], function(done){
	done();
	reld();
});

gulp.task('css-watch', ['styles'], function(done){
	done();
	reld();
});

// Watch JS and Sass and BrowserSync
gulp.task('serve', ['uglify', 'styles'], function () {

	// Serve files from the root of this project
	sync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('js/*.js', ['js-watch']);
	gulp.watch('scss/**/*.scss', ['css-watch']);
	gulp.watch('./*.html').on('change', sync.reload);
});

//Release-build Tasks

//Image compression task
gulp.task('image', function(){
	gulp.src('imgsrc/*')
	.pipe(imgm())
	.pipe(gulp.dest('img'));
});

//Clean Build directory
gulp.task('clean', function(){
	return gdel([
		'build/report.csv',
		'build/*',
	]);
});

//Copy files to build directory
gulp.task('copy', function(){
	gulp.src([
		'*.html',
		'*.php',
		'*.png',
		'*.xml',
		'*.txt',
		'*.ico',
		'img/**/*',
		'css/**/*',
		'fonts/**/*',
		'minjs/**/*',
		'js/vendor/*.*'
	],{
		"base" : "./"
	})
	.pipe(gulp.dest('build'));
});

//Build task
gulp.task('build', ['normalize', 'styles', 'uglify', 'clean', 'image', 'copy'])

//Default task
gulp.task('default', ['normalize', 'serve']);
