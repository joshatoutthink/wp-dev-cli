import { Argv } from "yargs";
import { finRoot } from "../utils";
exports.command = "build";
exports.description = "Prepare your project for production";

exports.builder = {
  projectRoot: {
    default: findRoot(),
  },
};
// @ts-ignore-next-line
exports.handler = function (argv: Argv) {};
