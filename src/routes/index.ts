import createCPT from "../commands/createCPT";
import createPlugin from "../commands/createPlugin/index";
import createAdminPage from "../commands/createAdminPage";
import createTheme from "../commands/createTheme";
import createEndpoint from "../commands/createEndpoint";
import createScript from "../commands/createScript";
import { CreateRunnerType } from "../types";

const create: CreateRunnerType = {
  cpt: createCPT,
  plugin: createPlugin,
  ["admin-page"]: createAdminPage,
  theme: createTheme,
  endpoint: createEndpoint,
  script: createScript,
};
const routes: Record<string, CreateRunnerType> = { create };
export { routes };
