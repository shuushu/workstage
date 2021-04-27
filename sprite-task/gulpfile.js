var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");
var imagemin = require("gulp-imagemin");
var name = "person";
// 배치할 경로
var workPath = "../attendance";

gulp.task("sprite", function () {
  var spriteData = gulp
    .src([
      `./imgs/${name}/*.png`,
      `./imgs/${name}/*.jpg`,
      `./imgs/${name}/*.jpeg`,
      `./imgs/${name}/*.gif`,
    ])
    .pipe(imagemin())
    .pipe(
      spritesmith({
        imgName: `${workPath}/src/asset/imgs/sprite-${name}.png`,
        cssName: `${workPath}/src/asset/scss/sprite-${name}.scss`,
      })
    );
  return spriteData.pipe(gulp.dest(`./`));
});
