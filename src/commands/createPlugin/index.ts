import type { OptionsType } from "../../types";
import * as path from "path";
import {
  CaseInterface,
  toSnakeCase,
  generateFilesFromTemplate,
} from "../../utils";
import inquirer = require("inquirer");

export default async function (options: OptionsType) {
  console.log("creating plugin with options", options);
  const templatePath = "plugin/plugin-name";
  let destination;
  let searchAndReplaceConfig: CaseInterface;

  //DESTINATION
  if (!inPluginDir() && noFolderNameGiven(options)) {
    console.log("Creating Plugin in current directory");
    destination = process.cwd();
  } else {
    destination = await getDestination();
  }

  // if (isInteractive(options)) {
  searchAndReplaceConfig = await inquireOfOptions(options);
  // }

  //Create Cases or ask for them

  generateFilesFromTemplate({
    templatePath,
    destination,
    searchAndReplaceConfig,
  });
}
// const testPluginInfo = {
//   templatePath: "plugin/plugin-name",
//   destination: process.cwd() + "/test",
//   searchAndReplaceConfig: {
//     snakeCase: {
//       search: "plugin_name",
//       replace: "my_plugin",
//     },
//     kebabCase: {
//       search: "plugin-name",
//       replace: "my-plugin",
//     },
//     upperSnakeCase: {
//       search: "PLUGIN_NAME",
//       replace: "MY_PLUGIN",
//     },
//     TitleSnakeCase: {
//       search: "Plugin_Name",
//       replace: "My_Plugin",
//     },
//   },
// };

// generateFilesFromTemplate({ ...testPluginInfo }).catch(console.error);

function inquireOfOptions(options: OptionsType): CaseInterface {
  const searchAndReplaceConfig = {
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
    TitleSnakeCase: {
      search: "Plugin_Name",
      replace: "My_Plugin",
    },
  };

  const questions = [];
  const optionsObject = options.reduce(
    (obj: Record<string, string | number | boolean>, option) => {
      obj[option.option] = option.value;
      return obj;
    },
    {}
  );
  if (!("--plugin-slug" in optionsObject)) {
    questions.push(
      new Question("kebabCase", "What is the Plugin's Slug", "my-plugin")
    );
  } else {
    searchAndReplaceConfig.kebabCase.replace = String(
      optionsObject["--plugin-slug"]
    );
  }

  if (!("--plugin-instance" in optionsObject)) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(optionsObject["--plugin-slug"])
    );
  }

  return searchAndReplaceConfig;
}

function inPluginDir() {
  return path.basename(process.cwd()) == "plugins";
}
function noFolderNameGiven(options: OptionsType) {
  return Boolean(
    options.length == 0 || options.findIndex((o) => o.option === "--folder")
  );
}

function isInteractive(options: OptionsType) {
  return (
    options.includes({ option: "--interactive", value: true }) ||
    options.length == 0
  );
}

class Question {
  constructor(
    public name: string,
    public message: string,
    public defaultVal: string | boolean,
    public type: string = "input"
  ) {
    return this;
  }
}

function getDestination(): Promise<string> {
  return inquirer
    .prompt([
      new Question(
        "destination",
        "No destination was given would you like to use the plugin slug given later",
        true,
        "confirm"
      ),
    ])
    .then((answer) => {
      if (answer.destination) {
        return answer.destination;
      }
      return inquirer
        .prompt([
          new Question(
            "destination",
            "Give an Absolute Path to destination of plugin",
            path.join(process.cwd(), "/my-plugin")
          ),
        ])
        .then((res) => res.destination);
    });
}
