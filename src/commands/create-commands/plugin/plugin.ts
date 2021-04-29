import createPlugin from "./helpers";

exports.command = "plugin [pluginName]";
exports.desc = "creates a plugin";
exports.builder = {
  pluginName: {
    default: ".",
  },
};
//
exports.handler = createPlugin;
