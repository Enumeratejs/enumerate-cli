const expect = require('expect');
const {describe, it} = require('mocha');
const {exec} = require('./utils');
const {safeLoad} = require('js-yaml');


describe('cli', () => {
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

  it('handles invalid constants', (done) => {
    const cmd = 'node ./bin/enumerate merge ./test/fixtures/invalid.yaml ./test/fixtures/constants-2.yaml';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(stderr).toEqual(expect.stringContaining('YAMLException: unexpected end of the stream'));
      expect(stdout).toEqual('');

      done();
    });
  });

  it('handles invalid query', (done) => {
    const cmd = 'node ./bin/enumerate merge ./test/fixtures/constants.yaml ./test/fixtures/invalid.yaml';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(stderr).toEqual(expect.stringContaining('YAMLException: unexpected end of the stream'));
      expect(stdout).toEqual('');

      done();
    });
  });

  it('handles invalid file', (done) => {
    const cmd = 'node ./bin/enumerate merge ./test/fixtures/does-not-exist.yaml ./test/fixtures/constants-2.yaml';
    exec(cmd, 'utf8', (error, stdout, stderr) => {
      expect(stderr).toEqual(expect.stringContaining('ENOENT: no such file or directory'));
      expect(stdout).toEqual('');

      done();
    });
  });
});
