import * as path from "path";
import * as os from "os";
import * as fs from "fs";
export * from "./handle-templates";
export * from "./arg-merger";

export function createPHPConst(string: string) {
  return string.toUpperCase().replace(" ", "-").split("-").join("_");
}
export function slugify(string: string) {
  return string.toLowerCase().split(" ").join("-");
}

export function createNameSpace(string: string) {
  return string
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function toSnakeCase(string: string): string {
  return string.replaceAll(" ", "_").replaceAll("-", "_").toLowerCase();
}
export function toUpperSnakeCase(string: string): string {
  return toSnakeCase(string).toUpperCase();
}
export function toTitleSnakeCase(string: string): string {
  const lowerSnakeCase = toSnakeCase(string);
  return upperCaseInEach(lowerSnakeCase, "_");
}
export function toKebabCase(string: string): string {
  return slugify(string);
}

function upperCaseInEach(words: string, splitOn: string): string {
  return words.split(splitOn).map(capFirst).join(splitOn);
}
function capFirst(word: string) {
  const cap = word.charAt(0).toUpperCase();
  const letters = word.split("");
  letters.splice(0, 1, cap);
  return letters.join("");
}

export function findRoot() {
  const wpGenConfig = findConfig("wpgenConfig.json");
  const packageConfig = findConfig("package.json");
  if (wpGenConfig) {
    return path.dirname(wpGenConfig);
  }
  if (packageConfig) {
    return path.dirname(packageConfig);
  }
  console.log(
    "Could not locate a project root packaging the Current Working Directory"
  );
  return process.cwd();
}
const homeDir = os.homedir();
function findConfig(
  file: string,
  dir: string = process.cwd(),
  lookInHomeDir: boolean = false
): string | false {
  //we dont want to check home dir unless told to
  // gives us a place to stop recursing if its not there
  if (path.resolve(dir) == homeDir && !lookInHomeDir) {
    return false;
  }

  const filePath = fileExists(path.join(dir, file));
  if (!filePath) {
    const parentDir = path.resolve(dir).replace(path.basename(dir), "");
    return findConfig(file, parentDir, lookInHomeDir);
  }
  //we found it
  return filePath;
}

export function fileExists(path: string): string | false {
  try {
    if (fs.existsSync(path)) {
      return path;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
