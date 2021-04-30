#!/usr/bin/env node

import yargs from "yargs";

//
yargs(process.argv.slice(2))
  .commandDir("./commands")
  .example(
    "wp-gen create plugin '\"awesome plugin\"'",
    '"Create a wordpress plugin in the directory awesome-plugin"'
  )
  .demandCommand()
  .strict().argv;
