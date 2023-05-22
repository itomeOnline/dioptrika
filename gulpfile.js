const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const browserSync = require('browser-sync');
const autoPrefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const emitty = require('emitty').setup('src/templates', 'pug', {
	makeVinylFile: true
});
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');
const imagemin  = require('gulp-imagemin');
const pngquant  = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminWebp = require('imagemin-webp');
const extReplace = require("gulp-ext-replace");


const cache   = require('gulp-cache');
const notify  = require("gulp-notify");

const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const shebang = require("rollup-plugin-preserve-shebang");
const css = require("rollup-plugin-css-porter");
const sourcemaps = require("gulp-sourcemaps");
const scss = require('rollup-plugin-scss');





sass.compiler = require('sass');


function processSass() {
	return gulp.src('src/scss/**/*.+(sass|scss)') 
	.pipe(sass().on("error", notify.onError()))
	.pipe(autoPrefixer({browsers:['last 4 versions']}))
	.pipe(csso())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
};



function templates (d) {
	 new Promise((resolve, reject) => {
		const sourceOptions = global.watch ? { read: false } : {};
		emitty.scan(global.emittyChangedFile).then(() => {
			gulp.src('src/templates/*.pug')
			.pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
			.pipe(pugLinter({ reporter: 'default' }))
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream({once: true}))
			.on('end', resolve)
			.on('error', notify.onError());
		});
	})
	 d();

	
};




function svg() {
	return gulp.src('src/assets/svg/*.svg')
	.pipe(svgmin( {
		js2svg: {
			pretty: true
		}
	}))

	.pipe(svgSprite({
		mode: 'symbols',
		preview: false,
		svg: {
			symbols: "icons.svg"
		}
	}))
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
		},
		parserOptions: { xmlMode: true }
	}))
	.pipe(gulp.dest('src/assets/'));
}

function optimizeImgs() {
	return gulp.src('src/assets/img/**/*', {since: gulp.lastRun(optimizeImgs)}) 
	.pipe(imagemin(
	 [
	  pngquant({
	   quality: 70
	  }),
	  imageminJpegRecompress({
	   progressive: true,
	   max: 70,
	   min: 70
	  })
	 ]
	 ))
	.pipe(gulp.dest('dist/assets/img'))
   }

function convertToWebP() {
	return gulp.src('src/assets/img/**/*.{jpg,jpeg,png}', {since: gulp.lastRun(convertToWebP)}) 
	.pipe(imagemin(
		[
			imageminWebp({
				quality: 70,
			}),
		]
		))
	.pipe(extReplace(".webp"))
	.pipe(gulp.dest('dist/assets/img'))
}



function browsersync() { 
	browserSync({ 
		server: { 
			baseDir: './dist',
			serveStaticOptions: {
				extensions: ["html"]
			}			
		},

	});
};

function browserReload () {
	return browserSync.reload;
}

function scripts() {
	return gulp.src("src/js/app.js")
	.pipe(rollup({
		plugins: [
			scss({
				output: 'src/scss/_includes/_bundle.scss',
				outputStyle: "compressed",
			}),
			shebang(),
			commonjs(),
			resolve()
		]
	},{
		format: "iife"
	}))
	.on("error", notify.onError())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.stream());
}
function scriptsBuild() {
	return gulp.src("src/js/app.js")
	.pipe(sourcemaps.init())
	.pipe(rollup({
		plugins: [
			commonjs(),
			resolve(),
			babel({
				runtimeHelpers: true,
			}),
			uglify.uglify()
		],
	},{
		format: "iife"
	}))
	.on("error", notify.onError())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest("dist/js"))
}



function watch() {
	global.watch = true;

	gulp.watch('./src/scss/**/*.+(sass|scss)', gulp.series(processSass));

	gulp.watch('./src/assets/img/*', gulp.series(convertToWebP, optimizeImgs))
	.on('change', browserReload());
	

	gulp.watch('./src/assets/svg/*', gulp.series(svg))
	.on('change', browserReload());
	gulp.watch('./src/js/**/*.js', gulp.series(scripts))
	.on('change', browserReload());

	gulp.watch('./src/templates/**/*.pug', gulp.series(templates))
	.on('change', browserReload())
	.on('all', (event, filepath) => {
		global.emittyChangedFile = filepath;
	});
	
	

}
const watching = gulp.parallel(watch, browsersync);

exports.templates = templates;
exports.sass = processSass;
exports.img = gulp.series(optimizeImgs, convertToWebP);
exports.svg = svg;
exports.watch = watch;
exports.scripts = scripts;
exports.scriptsBuild = scriptsBuild;
exports.default = gulp.series(templates, processSass, scripts, watching);
