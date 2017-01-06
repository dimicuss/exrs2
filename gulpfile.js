const
	path    = require('path'),
	gulp    = require('gulp'),
	concat  = require('gulp-concat'),
	react   = require('gulp-react'),
	stylus  = require('gulp-stylus'),
	babel   = require('gulp-babel'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss' ),
	autopr  = require('autoprefixer')
	mode    = ''


function makePath(scriptsSrc) {
	return filepath => {
		return path.join(scriptsSrc, filepath)
	}
}

function concatArrays(...arrays) {
	if(arrays.length == 1) {
		return arrays[0]
	}

	return arrays[0].concat(
		concatArrays.apply(null, arrays.slice(1)))
}

function setEnv(env, fn) {
	fn.call(env)
}


gulp.task('scripts', setEnv(mode, function () {
	const scriptsDst = 'public/scripts'

	return gulp.src(concatArrays(
			[
				`react/react${this}.js`,
				`react/react-dom${this}.js`,
			].map(makePath('bower_components/')),
			[
				'global_scripts/**/*.js'
			].map(makePath('resources/')))
	)
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015'],
			compact: mode === '.min'
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(scriptsDst))
}))


gulp.task('react_scripts', () => {
	const scriptsDst = 'public/react_scripts'
	return gulp.src([
		'*.jsx'
	].map(makePath('resources/react_scripts/')))
		.pipe(plumber())
		.pipe(react())
		.pipe(babel({
			presets: ['es2015'],
			compact: mode === '.min'
		}))
		.pipe(gulp.dest(scriptsDst))
})


gulp.task('stylus', () => {
	const cssDst = 'public/styles'
	return gulp.src('resources/stylus/style.styl')
		.pipe(plumber())
		.pipe(stylus({
			compress:      mode === '.min',
			'include css': true
		}))
		.pipe(postcss([
			autopr({ browsers: ['last 5 versions'] })
		]))
		.pipe(gulp.dest(cssDst))
})


gulp.task('replace_html', () => {
	return gulp.src('resources/pages/*')
		.pipe(gulp.dest('public/pages'))
})


gulp.task('replace_images', () => {
	return gulp.src('resources/images/*')
		.pipe(gulp.dest('public/images'))
})


gulp.task('replace_fonts', () => {
	gulp.src('resources/fonts/**/*')
	.pipe(gulp.dest('public/fonts'))
})


gulp.task('default', [
	'scripts',
	'react_scripts',
	'stylus',
	'replace_html',
	'replace_images',
	'replace_fonts'
])


gulp.watch('resources/stylus/**/*', ['stylus'])
gulp.watch('resources/react_scripts/**/*', ['react_scripts'])