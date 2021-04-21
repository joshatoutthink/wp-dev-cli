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
