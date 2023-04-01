import * as assert from 'assert';
import dirToObj from '../dist/main.js';

const defaultDataDir = './tests/data/default';

it('Default', async () => {
  assert.deepStrictEqual(await dirToObj(defaultDataDir), {
    'a.txt': '410a',
    sub: {
      'sub-a.txt': '5355425f410a',
      'sub-b.txt': '5355425f420a',
    },
  });
});

it('textMode', async () => {
  assert.deepStrictEqual(await dirToObj(defaultDataDir, { textMode: true }), {
    'a.txt': 'A\n',
    sub: {
      'sub-a.txt': 'SUB_A\n',
      'sub-b.txt': 'SUB_B\n',
    },
  });
});

it('ignoreMap (files)', async () => {
  assert.deepStrictEqual(
    await dirToObj(defaultDataDir, { ignoreMap: new Set<string>(['sub-a.txt']) }),
    {
      'a.txt': '410a',
      sub: {
        'sub-b.txt': '5355425f420a',
      },
    },
  );
});
