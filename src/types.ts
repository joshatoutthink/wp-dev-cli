export type Choices<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer Choices
>
  ? Choices
  : never;
export type CreateCommandsType = [
  "cpt",
  "plugin",
  "admin-page",
  "theme",
  "endpoint",
  "script"
];

export type CreateCommandTypes = Choices<CreateCommandsType>;

export type CreateRunnerType = Record<string, (args: any) => void>;

export type OptionsType = {
  option: string;
  value: number | boolean | string;
}[];
