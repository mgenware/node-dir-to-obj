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
