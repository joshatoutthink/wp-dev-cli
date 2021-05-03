import archiver from "archiver";
import * as fs from "fs";
/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
export default function zipDir(
  source: string,
  out: string,
  ignoreGlob: string[] = []
) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .glob("**", {
        cwd: source,
        ignore: ["node_modules/**", "builds/**", ...ignoreGlob],
      })
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve("ok"));
    archive.finalize();
  });
}
