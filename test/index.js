const expect = require('expect');
const {describe, it} = require('mocha');
const {exec} = require('./utils');


describe('cli', () => {
  it('shows help page', (done) => {
    const cmd = 'node ./bin/enumerate';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(error).toEqual(null);
      expect(stderr).toEqual(expect.stringContaining('Usage: enumerate <command> [options]'));
      expect(stdout).toEqual('');

      done();
    });
  });
});
