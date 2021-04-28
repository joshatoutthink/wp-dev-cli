import * as fs from "fs";
import { ncp } from "ncp";
import * as path from "path";
import rootDir from "../rootDir";
// @ts-ignore-next-line
import * as replace from "replace";

interface TemplatePathInfoInterface {
  path: string;
  isDir: boolean;
}
/* 
Returns a list of objects
*/
export function walkDirFactory() {
  let list: TemplatePathInfoInterface[] = [];

  /*
  NO Trailing Slash for the path
  */
  return function walkDir(dir: string): TemplatePathInfoInterface[] {
    const pathType = getPathType(dir);
    if (pathType instanceof Error) throw pathType; //check for errors

    if (pathType == "file") {
      list.push({ path: dir, isDir: false });
    } else {
      list.push({ path: dir, isDir: true });
      fs.readdirSync(dir).forEach((child) => walkDir(path.join(dir, child)));
    }
    return list;
  };
}
//comment
export function getPathType(path: string) {
  const stats = fs.statSync(path);
  return stats.isFile()
    ? "file"
    : stats.isDirectory()
    ? "directory"
    : new Error("Not sure what kind of path");
}

export function getDirectories(paths: TemplatePathInfoInterface[]) {
  return paths.filter((path) => path.isDir === true);
}
export function getFiles(paths: TemplatePathInfoInterface[]) {
  return paths
    .filter((path) => path.isDir === false)
    .filter((p) => path.basename(p.path) !== ".DS_Store");
}

export function rename(regex: RegExp, replaceValue: string, path: string) {
  const newPath = path.replace(regex, replaceValue);
  fs.renameSync(path, newPath);
}

export function searchAndReplace(templateDir: string) {
  return function _searchAndReplace(regex: string, replacement: string) {
    replace({
      regex,
      replacement,
      paths: [templateDir],
      recursive: true,
      silent: false,
    });
  };
}

export function copyTemplate(templatePath: string, newDirectory: string) {
  return new Promise((resolve, reject) => {
    ncp(
      path.resolve(`${rootDir}/../templates/${templatePath}`),
      newDirectory,
      function (e) {
        if (e) {
          console.log(e);
          reject(e);
        }
        resolve(null);
      }
    );
  });
}

interface CaseConfigInterface {
  search: string;
  replace: string;
}
export interface CaseInterface {
  snakeCase?: CaseConfigInterface;
  kebabCase: CaseConfigInterface;
  upperSnakeCase?: CaseConfigInterface;
  TitleSnakeCase?: CaseConfigInterface;
}

//type helper
function caseConfigDefined(
  caseConfigInterface: CaseConfigInterface | undefined
) {
  if (typeof caseConfigInterface !== "undefined") {
    return caseConfigInterface as CaseConfigInterface;
  } else {
    return false;
  }
}

export async function generateFilesFromTemplate({
  templatePath,
  destination,
  searchAndReplaceConfig,
}: {
  templatePath: string;
  destination: string;
  searchAndReplaceConfig: CaseInterface;
}) {
  //copy template to dir
  await copyTemplate(templatePath, destination);

  //get all paths
  const paths = getFiles(walkDirFactory()(destination));
  const searchAndReplaceTemplate = searchAndReplace(destination);
  paths.forEach((templatePathInfo) => {
    //rename all files and dirZ
    rename(
      new RegExp(searchAndReplaceConfig.kebabCase?.search, "gi"),
      searchAndReplaceConfig.kebabCase?.replace,
      templatePathInfo.path
    );
  });
  //search and replace all in files
  Object.keys(searchAndReplaceConfig).forEach((caseType) => {
    //making sure we have something defined
    const caseConfig = caseConfigDefined(
      searchAndReplaceConfig[caseType as keyof CaseInterface]
    );
    if (caseConfig) {
      const { search, replace } = caseConfig;
      searchAndReplaceTemplate(search, replace);
    }
  });
}

//==FOR TESTING PURPOSES
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
