import createPlugin from "./helpers";

exports.command = "createPlugin [dir]";
exports.desc = "creates a plugin";
exports.builder = {
  dir: {
    default: ".",
  },
};
exports.handler = createPlugin;
