// Tasks to run Rollup
const path = require("path");
const gulp = require("gulp");
const rollup = require("rollup");
const { createAppConfig } = require("../rollup");
const paths = require("../paths");

gulp.task("rollup-watch-app", () => {
  // we are not calling done, so this command will run forever
  const { inputOptions, outputOptions } = createAppConfig({
    isProdBuild: false,
    latestBuild: true,
  });

  const watcher = rollup.watch({
    ...inputOptions,
    output: [outputOptions],
    watch: {
      include: "src",
    },
  });
  watcher.on("event", (event) => {
    if (event.code === "ERROR") {
      console.error(event.error);
    }
  });

  gulp.watch(
    path.join(paths.translations_src, "en.json"),
    gulp.series("build-translations", "copy-translations")
  );
});
