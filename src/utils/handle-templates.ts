import * as fs from "fs";
import * as fsp from "fs/promises";
import { copyFile } from "node:fs";
import { basename } from "node:path";
import { ncp } from "ncp";
import * as path from "path";
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
  return paths.filter((path) => path.isDir === false);
}

export function rename(regex: RegExp, replaceValue: string, path: string) {
  const newPath = path.replace(regex, replaceValue);
  fs.renameSync(path, newPath);
}
export function searchAndReplaceFactory(templateDir: string) {
  return function searchAndReplace(regex: string, replacement: string) {
    replace({
      regex,
      replacement,
      paths: [templateDir],
      recursive: true,
      silent: false,
    });
  };
}

export async function generateFilesFromTemplate(
  templatePath: string,
  searchAndReplaceList: { search: string; replace: string }[]
) {
  //copy template to dir -> ncp for the win
  //get all paths
  //rename all files and dirZ
  //search and replace all in files
}

ncp(
  `${process.cwd()}/templates/plugin/plugin-name`,
  `${process.cwd()}/notreal`,
  function (e) {
    if (e) console.log(e);
  }
);
