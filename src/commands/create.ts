import { Argv } from "yargs";
exports.command = "create <command>";
exports.description = "Scaffold out a wp project, Post type or Interface";

exports.builder = function (yargs: Argv) {
  return yargs.commandDir("create", {
    recurse: true,
    exclude: /\/util\//,
  });
};
// @ts-ignore-next-line
exports.handler = function (argv: Argv) {};
