export type Choices<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer Choices
>
  ? Choices
  : never;
export const CreateCommands = [
  "cpt",
  "plugin",
  "admin-page",
  "theme",
  "endpoint",
  "script",
];
export type CreateCommandTypes = Choices<typeof CreateCommands>;
export type Argv = Record<string, string | number | unknown>; //TODO better type this
export type CreateRunnerType = Record<CreateCommandTypes, (args: Argv) => void>;
