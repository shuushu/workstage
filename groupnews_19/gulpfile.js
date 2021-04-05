var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");
var paths = "./src/asset";

gulp.task("sprite", function () {
  var spriteData = gulp
    .src([
      `${paths}/imgs/sprite/*.png`,
      `${paths}/imgs/sprite/*.jpg`,
      `${paths}/imgs/sprite/*.jpeg`,
      `${paths}/imgs/sprite/*.gif`,
    ])
    .pipe(
      spritesmith({
        imgName: `${paths}/imgs/sprite-d.png`,
        cssName: `${paths}/scss/sprite-d.scss`,
      })
    );
  return spriteData.pipe(gulp.dest(`./`));
});
