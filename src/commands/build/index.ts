import type { OptionsType } from "../../types";
import { argMerger } from "../../utils";
import * as fs from "fs";
import * as path from "path";
import zipDir from "./zipDir";
// import ncp from "ncp";
// import rimraf from "rimraf";

export default async function createZippedBuild(optionsFromYargs: OptionsType) {
  const options = argMerger(optionsFromYargs, "zip");
  const target = options.projectRoot;
  const output = options.output;
  const outputDir = path.dirname(output);

  //copy to temp

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await zipDir(target, output);
}

// function ncpPromise(inT: string, outT: string): Promise<any> {
//   return new Promise((res, reject) => {
//     ncp(
//       inT,
//       outT,
//       {
//         filter: (path) => {
//           console.log(path);
//           return !path.includes("builds") || path.includes("temp");
//         },
//       },
//       (e) => {
//         if (e) {
//           reject(e);
//         } else {
//           res("pk");
//         }
//       }
//     );
//   });
// }
