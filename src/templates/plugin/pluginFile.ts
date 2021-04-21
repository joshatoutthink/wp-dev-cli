import { slugify, createPHPConst, createNameSpace } from "../../utils";

export function pluginFile({
  pluginName,
  pluginUri,
  pluginDescription,
  pluginAuthor,
}: Record<string, string>) {
  const pluginNameAllCaps = createPHPConst(pluginName);
  const pluginPathConst = `${pluginNameAllCaps}_PATH`;
  return `\
<?php
/**
 * Plugin Name:${pluginName}
 * Plugin URI: ${pluginUri}
 * Description: ${pluginDescription}
 * Version: 1.0
 * Author: ${pluginAuthor}
 */

define('${pluginPathConst}', plugin_dir_path(__FILE__));
define('${pluginNameAllCaps}_URL', plugin_dir_url(__FILE__));
include_once ${pluginPathConst} . '/plugin-version.php';

//TODO: add CPTS
//TODO: add activation and delete files
require ${pluginPathConst} . '/classes/class-${slugify(pluginName)}.php';\
`;
}

export function pluginVersion(pluginName: string) {
  return `define(${createNameSpace(pluginName)}_VERSION, 1.0);`;
}

export function pluginCoreClass({ pluginName }: Record<string, string>) {
  const className = createPHPClass(pluginName);
  return `\
<?php
if(!class_exists( "${className}" )){
  class ${className} {
    function __constructor(){
      // todo
    }
  }
  new ${className}();
}
`;
}
function createPHPClass(string: string) {
  return string
    .split(" ")
    .map((word) => {
      const cap = word[0].toUpperCase();
      const wordArray = word.split("");
      wordArray.splice(0, 1, cap);

      return wordArray.join("");
    })
    .join("_");
}
