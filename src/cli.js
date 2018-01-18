import {safeDump, safeLoad} from 'js-yaml';
import {readFileSync} from 'fs';

const enumerate = require('enumerate');

const {log} = console;

const cli = require('yargs')
  .usage('\nUsage: $0 <command> [options]')
  .command('filter <src> <query>', 'filter identities', (yargs) => {
    yargs
      .positional('src', {
        describe: 'source identities file',
      })
      .positional('queries', {
        describe: 'source query file',
      });
  }, (yargs) => {
    const {identities: src} = safeLoad(readFileSync(yargs.src, 'utf-8'));
    const {conditions} = safeLoad(readFileSync(yargs.query, 'utf-8'));

    const identities = enumerate.filter(src, conditions);

    log(safeDump({identities}));
  })
  .command('merge <src> <merge>', 'merge identities', (yargs) => {
    yargs
      .positional('src', {
        describe: 'source identities file',
      })
      .positional('merge', {
        describe: 'source identities file to merge',
      });
  }, () => {
    console.log('MERGE');
  })
  .command('export <src> <exporter>', 'export identities', (yargs) => {
    yargs
      .positional('src', {
        describe: 'source identities file',
      })
      .positional('exporter', {
        describe: 'source identities file to merge',
      });
  }, () => {
    console.log('EXPORT');
  });

module.exports = cli;
