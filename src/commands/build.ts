import * as path from "path";

import { findRoot } from "../utils";
import zipDirectory from "./build/index";

exports.command = "build";
exports.description = "Prepare your project for production";
const root = findRoot();
exports.builder = {
  projectRoot: {
    default: root,
  },
  output: {
    default: path.join(root, `builds/${path.basename(process.cwd())}.zip`),
  },
};
// @ts-ignore-next-line
exports.handler = zipDirectory;
