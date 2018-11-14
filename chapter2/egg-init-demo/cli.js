#!/usr/bin/env node

const modulee = require("./");
const pkg = require("./package.json");
const path = require("path");
const chalk = require("chalk");
const tildify = require("tildify");
const yargs = require("yargs");

const {argv} =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("<dir>"))}`)
  .demand(0, 1, chalk.red("Too many directories specified."))
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

Promise.resolve(
  path.resolve(process.cwd(), argv._.length > 0 ? String(argv._[0]) : ".")
).then(dir => {
  console.log(chalk.green("Creating module..."));
  return modulee(dir);
}).then(files => {
  files.map(tildify).forEach(file => console.log(chalk.green("+", file)));
  console.log(chalk.green("Module created!"));
  process.exit();
}).catch(() => {
  console.error(chalk.red("An error occurred."));
  process.exit(1);
});
