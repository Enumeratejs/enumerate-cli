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
    // Load YAML data
    const {identities: src} = safeLoad(readFileSync(yargs.src, 'utf-8'));
    const {conditions} = safeLoad(readFileSync(yargs.query, 'utf-8'));

    // Perform filter
    const identities = enumerate.filter(src, conditions);

    // Export results
    log(safeDump({identities}));
  })
  .command('merge <src> <src2>', 'merge identities', (yargs) => {
    yargs
      .positional('src', {
        describe: 'source identities file',
      })
      .positional('src2', {
        describe: 'source identities file to merge',
      });
  }, (yargs) => {
    // Load YAML data
    const {identities: src} = safeLoad(readFileSync(yargs.src, 'utf-8'));
    const {identities: src2} = safeLoad(readFileSync(yargs.src2, 'utf-8'));

    // Perform merge
    const identities = enumerate.merge(src, src2);

    // Export results
    log(safeDump({identities}));
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
