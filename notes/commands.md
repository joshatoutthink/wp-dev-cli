# Notes About commands

- How to make it easy to unify commands
- what are the allowed options
- We should slurp up config \

## options hierarchy

specific to non specific then if still not there ask the user in inquirer

- from args
- from .config package.json
- from .global-config
- inquire

Lets not do this yet
lets create a arg command that merges in with the yargs.options `Object.assign()`
this will allow us to be really flexible and still move on with

## Each Create Module needs

/ - module name
|- module.ts - this is where we set up yargs options
|- createModule.ts - this is where the yargs.exports.handler will use. make sure to import it to module.ts as the handler.
|- moduleTypes.ts - this is where all the types and options will come from

## module should allow specifying the template path.

## need to add in all project templates a wp-gen config that says what kind of project it is so we know where to place cpt, or how to deploy it.
