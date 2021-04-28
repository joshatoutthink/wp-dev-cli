import createPlugin from "./helpers";

exports.command = "createPlugin [destination]";
exports.desc = "creates a plugin";
exports.builder = {
  destination: {
    default: ".",
  },
};
//
exports.handler = createPlugin;
