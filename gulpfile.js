const { watch, dest, src, series } = require("gulp");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");

const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const notify = require("gulp-notify");
const gcmq = require("gulp-group-css-media-queries");

const webpack = require("webpack-stream");

const ttf2woff2 = require("gulp-ttf2woff2");
const del = require("del");

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

const server = () => {
  browserSync.init({
    server: {
      baseDir: "./app/",
    },
  });
};

const html = () => {
  return src(["app/html/*.html"])
    .pipe(fileinclude())
    .pipe(dest("app/"))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(["app/scss/*.scss", "!app/scss/_*.scss"])
    .pipe(
      scss().on(
        "error",
        notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        }))
      )
    )
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
};

const stylesBuild = () => {
  return src("app/css/*.css").pipe(cleanCSS()).pipe(dest("dist/css/"));
};

const scripts = () => {
  return src("app/js/components/script.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "index.js",
        },
        devtool: "source-map",
      })
    )
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return src("app/js/components/script.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "index.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(dest("dist/js/"));
};

const fonts = () => {
  return src("app/fonts/*.ttf").pipe(ttf2woff2()).pipe(dest("app/fonts/"));
};

const delFonts = () => {
  return del("app/fonts/*.ttf");
};

const copyFonts = () => {
  return src("app/fonts/*.*").pipe(dest("dist/fonts"));
};

const images = () => {
  return src("app/images/**/*.{jpg,png,jpeg,gif}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 4 }),
        imagemin.svgo({
          plugins: [{ cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images/"));
};

const webpConverter = () => {
  return src("app/images/**/*.{jpg,jpeg,png}")
    .pipe(webp())
    .pipe(dest("dist/images"));
};

const copyHtml = () => {
  return src("app/*.html").pipe(dest("dist/"));
};

watch(["app/html/**/*.html"]).on("change", html);
watch(["app/scss/**/*.scss"]).on("change", styles);
watch(["app/js/components/*.js"]).on("change", scripts);

exports.default = server;
exports.scripts = scripts;
exports.html = html;
exports.scriptsBuild = scriptsBuild;
exports.styles = styles;
exports.stylesBuild = stylesBuild;
exports.images = images;
exports.fonts = series(fonts, delFonts);
exports.build = series(
  scriptsBuild,
  stylesBuild,
  copyFonts,
  images,
  webpConverter,
  copyHtml
);
