var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");

gulp.task("sprite", function () {
  "./groupnews_19/src/sprite/*.jpeg";
  var spriteData = gulp.src().pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.scss",
    })
  );
  return spriteData.pipe(gulp.dest("./groupnews_19/src/asset/imgs/"));
});
