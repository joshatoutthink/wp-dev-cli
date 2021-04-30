import type { OptionsType } from "../../../types";
import * as path from "path";
import {
  CaseInterface,
  toSnakeCase,
  toKebabCase,
  toTitleSnakeCase,
  toUpperSnakeCase,
  generateFilesFromTemplate,
} from "../../../utils";
import inquirer = require("inquirer");

export default async function createPlugin(options: any) {
  console.log("creating plugin with options", options);
  const templatePath = "plugin/plugin-name";
  let destination: string;

  //get the name
  const pluginName = await getPluginName(options.pluginName); //TODO
  //generate defaults
  const defaults = generateDefaultOptions(pluginName); //TODO

  //DESTINATION
  if (defaults["--plugin-slug"] == path.basename(process.cwd())) {
    // If they did not give us a destination nor did are we in the wp plugins directory
    // we should assume they want to put the plugin in the current working directory
    console.log("Creating Plugin in current directory");
    destination = process.cwd();
  }

  // if (isInteractive(options)) {
  const searchAndReplaceConfig = await inquireOfOptions(options, defaults);
  // }

  destination = await getDestination(searchAndReplaceConfig.kebabCase.replace);

  //Create Cases or ask for them
  console.log({
    templatePath,
    destination,
    searchAndReplaceConfig,
  });
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

async function inquireOfOptions(
  options: OptionsType,
  defaults: PluginOptions
): Promise<CaseInterface> {
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
    titleSnakeCase: {
      search: "Plugin_Name",
      replace: "My_Plugin",
    },
  };

  const questions = [];

  if ("--plugin-slug" in options) {
    searchAndReplaceConfig.kebabCase.replace = String(options["--plugin-slug"]);
  } else {
    questions.push(
      new Question(
        "kebabCase",
        "What is the Plugin's Slug eg. ( my-awesome-plugin )",
        defaults["--plugin-slug"]
      )
    );
  }

  if ("--plugin-instance" in options) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options["--plugin-instance"])
    );
  } else {
    questions.push(
      new Question(
        "snakeCase",
        "What is the Plugin's Instance Called eg ( my_awesome_plugin )",
        defaults["--plugin-instance"]
      )
    );
  }

  if ("--plugin-const" in options) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options["--plugin-const"])
    );
  } else {
    questions.push(
      new Question(
        "upperSnakeCase",
        "What is the Plugin's Const Name eg ( MY_AWESOME_PLUGIN )",
        defaults["--plugin-const"]
      )
    );
  }

  if ("--plugin-class" in options) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options["--plugin-class"])
    );
  } else {
    questions.push(
      new Question(
        "titleSnakeCase",
        "What is the Plugin's Class Name eg ( My_Awesome_Plugin )",
        defaults["--plugin-class"]
      )
    );
  }

  const answers: CaseTypes = await inquirer.prompt(questions);

  //This inserts the answers into the config
  Object.keys(answers).forEach((key) => {
    if (key in searchAndReplaceConfig && key in answers) {
      searchAndReplaceConfig[key as keyof CaseInterface].replace =
        answers[key as keyof CaseTypes];
    }
  });

  return searchAndReplaceConfig;
}

// function inPluginDir() {
//   return path.basename(process.cwd()) == "plugins";
// }

// function isInteractive(options: OptionsType) {
// return (
//     options.includes({ option: "--interactive", value: true }) ||
//     options.length == 0

// }

class Question {
  constructor(
    public name: string,
    public message: string,
    public defaultVal: string | boolean,
    public type: string = "input"
  ) {
    return { ...this, default: this.defaultVal };
  }
}

function getDestination(defaultDestination: string): Promise<string> {
  return inquirer
    .prompt([
      new Question(
        "destination",
        "No destination was given would you like to use the plugin slug",
        true,
        "confirm"
      ),
    ])
    .then((answer) => {
      if (answer.destination) {
        return defaultDestination;
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

function getPluginName(pluginName: string | undefined): Promise<string> {
  return new Promise(async (res) => {
    if (pluginName) {
      res(pluginName);
    } else {
      const { name } = await inquirer.prompt([
        new Question(
          "name",
          "What is the Name of your plugin",
          "My Awesome Plugin"
        ),
      ]);
      res(name);
    }
  });
}

// TODO use the case functions to generate options
// we will use this when asking user all the questions
// the keys should match the actual options
function generateDefaultOptions(pluginName: string) {
  const defaults: PluginOptions = {
    ["--plugin-slug"]: "",
    ["--plugin-instance"]: "",
    ["--plugin-const"]: "",
    ["--plugin-class"]: "",
  };
  defaults["--plugin-slug"] = toKebabCase(pluginName);
  defaults["--plugin-instance"] = toSnakeCase(pluginName);
  defaults["--plugin-const"] = toUpperSnakeCase(pluginName);
  defaults["--plugin-class"] = toTitleSnakeCase(pluginName);

  return defaults;
}

type CaseTypes = {
  kebabCase: string;
  snakeCase: string;
  upperSnakeCase: string;
  titleSnakeCase: string;
};
type PluginOptions = {
  ["--plugin-slug"]: string;
  ["--plugin-instance"]: string;
  ["--plugin-const"]: string;
  ["--plugin-class"]: string;
};
