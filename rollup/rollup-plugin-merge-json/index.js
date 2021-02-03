import fs from 'fs';
import path from 'path';
import globby from 'globby';
import merge from 'deepmerge';
import { promisify } from 'util';

import 'colors';

let watchedFiles = [];

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

function isWatched(file) {
  return watchedFiles.indexOf(file) !== -1;
}

function createDirIfNotExist(to) {
  const dirs = [];
  let dir = path.dirname(to);

  while (dir !== path.dirname(dir)) {
    dirs.unshift(dir);
    dir = path.dirname(dir);
  }

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
}

async function readJson(jsonPath) {
  return await readFile(jsonPath, 'utf8');
}

function wrapWithKeys(json, keys) {
  return keys.reverse().reduce((result, current) => {
    return {
      [current]: result
    };
  }, json);
}

function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

export default function mergeJson(options = {}) {
  const {
    targets = [],
    verbose = false,
    watch = false,
    wrapWithPath = false,
    ...restOptions
  } = options;

  return {
    name: 'merge-json',
    buildStart: async function () {
      let mergeList = [];

      console.log('TARGETS');
      if (Array.isArray(targets) && targets.length) {
        for (const target of targets) {
          console.log('TARGET:', target);
          if (!isObject(target)) {
            throw new Error(
              `${JSON.stringify(target)} target must be an object`
            );
          }

          const { dest, src } = target;

          if (!src || !dest) {
            throw new Error(
              `${JSON.stringify(
                target
              )} target must have "src" and "dest" properties`
            );
          }

          const matchedPaths = await globby(src);
          const basePath = matchedPaths.reduce((result, iPath) => {
            const dir = path.dirname(iPath);

            if (result === '') {
              return dir;
            }

            const isNotInResult = dir.split(path.sep).find((splitDir) => {
              return result.indexOf(splitDir) === -1;
            });

            if (isNotInResult) {
              return dir.replace(new RegExp(`${isNotInResult}.*`), '');
            }

            return result;
          }, '');

          // remove destiny from matchedPaths to prevent infinite loopings
          if (matchedPaths.indexOf(dest) !== -1) {
            matchedPaths.splice(matchedPaths.indexOf(dest), 1);
          }

          // const basePath from matchedPaths

          if (matchedPaths.length) {
            for (const matchedPath of matchedPaths) {
              if (watch && !isWatched(matchedPath)) {
                this.addWatchFile(matchedPath);
                watchedFiles.push(matchedPath);
                verbose &&
                  console.log(`[merge-json]: Watching “${matchedPath}”`);
              }

              // 0. create const wrapPath to use to wrap json
              const wrapKeys = path
                .dirname(matchedPath)
                .replace(basePath, '')
                .split(path.sep)
                .concat(path.basename(matchedPath, path.extname(matchedPath)));

              // 1. await Read json
              await readJson(matchedPath)
                // 2. Parse as json
                .then((file) => {
                  if (!file) {
                    throw Error('No file');
                  }
                  return JSON.parse(file);
                })

                // 3. wrapWithPath && Wrap in path objects
                .then((json) => {

                  verbose && console.log(`[merge-json]: Wrap with path “${wrapKeys}”`);

                  if (wrapWithPath) {
                    return wrapWithKeys(json, wrapKeys);
                  }

                  return json;
                })

                // 4. push to mergeList
                .then((json) => {
                  mergeList.push(json);

                  return json;
                })

                .catch((error) => {
                  throw error;
                });
            }
          }

          console.log(mergeList);

          // 5. Merge  with result
          // console.log('merged', merge(...mergeList));

          // 6. await write result to destiny json (create dirs if required)
          await createDirIfNotExist(dest);
          await writeFile(dest, JSON.stringify(merge.all(mergeList)));
          // 5. Done; cleanup!!!
          mergeList = [];
        }
      }
    }
  };
}
