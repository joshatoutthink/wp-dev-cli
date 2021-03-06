import * as path from "path";
import {
  CaseInterface,
  toSnakeCase,
  toKebabCase,
  toTitleSnakeCase,
  toUpperSnakeCase,
  generateFilesFromTemplate,
  argMerger,
} from "../../../utils";
import inquirer = require("inquirer");
import { OptionsType, CaseTypes } from "../../../types";
import {
  PluginOptions,
  searchAndReplaceConfig as pluginSearAndReplaceConfig,
} from "./pluginTypes";

/**
 * Creates the plugin
 * @param optionsFromYargs
 */
export default async function createPlugin(optionsFromYargs: OptionsType) {
  //pull from configs
  const options = argMerger(optionsFromYargs, "plugin");

  console.log("creating plugin with options", options);

  const templatePath = `plugin/${options.template ? options.template : "wppb"}`;
  let destination: string;

  //get the name
  const pluginName = await getPluginName(options.pluginName);

  //generate defaults
  const defaults = generateDefaultOptions(pluginName);

  //DESTINATION
  if (defaults.pluginSlug == path.basename(process.cwd())) {
    // If they did not give us a destination nor did are we in the wp plugins directory
    // we should assume they want to put the plugin in the current working directory
    console.log("Creating Plugin in current directory");
    destination = process.cwd();
  }

  const searchAndReplaceConfig = await inquireOfOptions(
    options as PluginOptions,
    defaults
  );

  destination = await getDestination(searchAndReplaceConfig.kebabCase.replace);

  generateFilesFromTemplate({
    templatePath,
    destination,
    searchAndReplaceConfig,
  });
}

async function inquireOfOptions(
  options: PluginOptions,
  defaults: PluginOptions
): Promise<CaseInterface> {
  //Duplicate for safety
  const searchAndReplaceConfig = { ...pluginSearAndReplaceConfig };

  const questions = [];

  if (options.pluginSlug) {
    searchAndReplaceConfig.kebabCase.replace = String(options.pluginSlug);
  } else {
    questions.push(
      new Question(
        "kebabCase",
        "What is the Plugin's Slug eg. ( my-awesome-plugin )",
        defaults.pluginSlug
      )
    );
  }

  if (options.pluginInstance) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options.pluginInstance)
    );
  } else {
    questions.push(
      new Question(
        "snakeCase",
        "What is the Plugin's Instance Called eg ( my_awesome_plugin )",
        defaults.pluginInstance
      )
    );
  }

  if (options.pluginConst) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options.pluginConst)
    );
  } else {
    questions.push(
      new Question(
        "upperSnakeCase",
        "What is the Plugin's Const Name eg ( MY_AWESOME_PLUGIN )",
        defaults.pluginConst
      )
    );
  }

  if (options.pluginClass) {
    searchAndReplaceConfig.snakeCase.replace = toSnakeCase(
      String(options.pluginClass)
    );
  } else {
    questions.push(
      new Question(
        "titleSnakeCase",
        "What is the Plugin's Class Name eg ( My_Awesome_Plugin )",
        defaults.pluginClass
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
    pluginSlug: "",
    pluginInstance: "",
    pluginConst: "",
    pluginClass: "",
  };
  defaults.pluginSlug = toKebabCase(pluginName);
  defaults.pluginInstance = toSnakeCase(pluginName);
  defaults.pluginConst = toUpperSnakeCase(pluginName);
  defaults.pluginClass = toTitleSnakeCase(pluginName);

  return defaults;
}
