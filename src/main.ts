import * as mfs from 'm-fs';
import * as nodepath from 'path';

async function dirToObjInternal(dirPath: string, opt: Options): Promise<Record<string, unknown>> {
  const res: Record<string, unknown> = {};

  let files = await mfs.subFiles(dirPath);
  if (opt.ignoreMap) {
    files = files.filter((file) => !opt.ignoreMap?.has(file));
  }
  const subFileContentList = await Promise.all(
    files.map(async (f) => {
      const bytes = await mfs.readFileAsync(nodepath.join(dirPath, f));
      return bytes.toString('hex');
    }),
  );
  files.forEach((file, i) => {
    res[file] = subFileContentList[i];
  });

  let dirs = await mfs.subDirs(dirPath);
  if (opt.ignoreMap) {
    dirs = dirs.filter((dir) => !opt.ignoreMap?.has(dir));
  }
  const subDirResList = await Promise.all(
    dirs.map((dir) => dirToObjInternal(nodepath.join(dirPath, dir), opt)),
  );
  dirs.forEach((dir, i) => {
    res[dir] = subDirResList[i];
  });
  return res;
}

export interface Options {
  ignoreMap?: Set<string>;
}

export default async function dirToObj(
  dirPath: string,
  opt?: Options,
): Promise<Record<string, unknown>> {
  const path = nodepath.resolve(dirPath);
  if (!(await mfs.dirExists(path))) {
    throw new Error(`The directory "${path}" does not exist`);
  }
  return dirToObjInternal(path, opt ?? {});
}
