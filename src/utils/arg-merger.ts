import type { OptionsType } from "../types";
// TODO the can be better typed with Generics
export function argMerger(options: OptionsType, type: string): OptionsType {
  //
  //
  return Object.assign(getGlobalConfig(type), getProjectConfig(type), options);
}
// TODO move these to a file for config
export function getGlobalConfig(type: string): OptionsType | {} {
  console.log(type);
  return {};
}

export function getProjectConfig(type: string): OptionsType | {} {
  console.log(type);
  return {};
}
