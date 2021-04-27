import createPlugin from "./createPlugin/index";

exports.command = "createPlugin [destination]";
exports.desc = "creates a plugin";
exports.builder = {
  destination: {
    default: ".",
  },
};
exports.handler = createPlugin;
