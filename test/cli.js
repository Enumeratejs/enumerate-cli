const expect = require('expect');
const {describe, it} = require('mocha');
const {exec} = require('child_process');
const {safeLoad} = require('js-yaml');


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

  it('performs filters', (done) => {
    const cmd = 'node ./bin/enumerate filter ./test/fixtures/constants.yaml ./test/fixtures/query.yaml';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(error).toEqual(null);
      expect(stderr).toEqual('');

      const filtered = safeLoad(stdout);
      expect(filtered).toEqual({identities: {id1: {name: 'ID #1'}}});

      done();
    });
  });

  it('performs merges', (done) => {
    const cmd = 'node ./bin/enumerate merge ./test/fixtures/constants.yaml ./test/fixtures/constants-2.yaml';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(error).toEqual(null);
      expect(stderr).toEqual('');

      const filtered = safeLoad(stdout);
      expect(filtered).toEqual({
        identities: {
          id1: {name: 'ID #1', extras: [1, 2]},
          id2: {name: 'ID #2'},
          id3: {name: 'ID #3'},
        },
      });

      done();
    });
  });
});
