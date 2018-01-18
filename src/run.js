import cli from './cli';

function run() {
  if (cli.argv._.length === 0) {
    cli.showHelp();
  }
}

module.exports = run;
