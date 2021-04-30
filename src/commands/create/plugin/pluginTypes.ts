export type PluginOptions = {
  pluginSlug: string;
  pluginInstance: string;
  pluginConst: string;
  pluginClass: string;
};

export const searchAndReplaceConfig = {
  snakeCase: {
    search: "plugin_name",
    replace: "my_plugin",
  },
  kebabCase: {
    search: "plugin-name",
    replace: "my-plugin",
  },
  upperSnakeCase: {
    search: "PLUGIN_NAME",
    replace: "MY_PLUGIN",
  },
  titleSnakeCase: {
    search: "Plugin_Name",
    replace: "My_Plugin",
  },
};
