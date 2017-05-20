var gulp = require('gulp');
var rseq = require('run-sequence');
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

var onError = function (err) {
	console.log(err.toString());
	this.emit('end');
};

gulp.task('normalize', function(){
	return gulp.src('node_modules/normalize.css/normalize.css')
	.pipe(nano())
	.pipe(gulp.dest('css/vendors'))
});

//Styles task
gulp.task('styles', function(){
	return gulp.src('scss/**/*.scss')
	.pipe(plmb(onError))
	.pipe(maps.init())
	.pipe(sass({includePaths: ['scss']}))
	.pipe(apre(autoprefixerOptions))
	.pipe(nano())
	.pipe(maps.write('../css/maps'))
	.pipe(gulp.dest('css'));
});

//Uglify task
gulp.task('uglify', function(){
	return gulp.src([
		'js/navigation.js',
		'js/video.js',
		'js/main.js'
	])
	.pipe(plmb(onError))
	.pipe(maps.init())
	.pipe(ugly())
	.pipe(conc('scripts.js'))
	.pipe(maps.write('../minjs/maps'))
	.pipe(gulp.dest('minjs'));
});

// Watch JS and Sass and BrowserSync
gulp.task('serve', function () {
	sync.init({
		server: {
			baseDir: "./",
			index: "simple-components.html"
		},
		files: [
			'css/*.css',
			'minjs/*.js',
			'./*.html'
		]
	});
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['uglify']);
	gulp.watch('scss/**/*.scss', ['styles']);
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
		'assets/**/*',
		'css/**/*',
		'!css/maps{,/**}',
		'fonts/**/*',
		'minjs/**/*',
		'!minjs/maps{,/**}',
		'js/vendor/*.*'
	],{
		"base" : "./"
	})
	.pipe(gulp.dest('build'));
});

//Build task
gulp.task('build', function(cb) {
	rseq('clean',
	['normalize', 'styles', 'uglify', 'image'],
	'copy', cb)
});

//Default task
gulp.task('default', ['normalize', 'uglify', 'styles', 'watch', 'serve']);
