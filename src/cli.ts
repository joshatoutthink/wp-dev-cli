#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { create } from "./commands";
const argv = yargs(hideBin(process.argv)).argv;

(function () {
  switch (argv._[0]) {
    case "create": {
      create[argv._[1]](argv);
      break;
    }
    default:
      console.log("oops not a valid command");
  }
})();
