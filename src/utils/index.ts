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
