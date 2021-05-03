import type { OptionsType } from "../../types";
import { argMerger } from "../../utils";
import * as fs from "fs";
import * as path from "path";
import zipDir from "./zipDir";

export default async function createZippedBuild(optionsFromYargs: OptionsType) {
  const options = argMerger(optionsFromYargs, "zip");
  const target = options.projectRoot;
  const output = options.output;
  const outputDir = path.dirname(output);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await zipDir(target, output, options.ignoreFiles);
}
