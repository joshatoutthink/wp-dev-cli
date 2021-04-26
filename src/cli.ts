#!/usr/bin/env node

import yargs from "yargs";

yargs(process.argv.slice(2))
  .commandDir("./commands")
  .example(
    "yarn rw g page home /",
    "\"Create a page component named 'Home' at path '/'\""
  )
  .demandCommand()
  .strict().argv;
