import createCPT from "./createCPT";
import createPlugin from "./createPlugin";
import createAdminPage from "./createAdminPage";
import createTheme from "./createTheme";
import createEndpoint from "./createEndpoint";
import createScript from "./createScript";
import { CreateRunnerType } from "../types";

const create: CreateRunnerType = {
  cpt: createCPT,
  plugin: createPlugin,
  ["admin-page"]: createAdminPage,
  theme: createTheme,
  endpoint: createEndpoint,
  script: createScript,
};
export { create };
