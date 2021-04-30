import createPlugin from "./createPlugin";

exports.command = "plugin [pluginName]";
exports.desc = "creates a plugin";
exports.builder = {
  pluginName: {},
  pluginSlug: {},
  pluginClass: {},
  pluginInstance: {},
  pluginDescription: {},
  template: {},
};
//
exports.handler = createPlugin;
