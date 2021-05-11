import { MutexInterface, Mutex } from "async-mutex";

import { KeyValuePair } from "../../src.common/utils/types.js";

export class AsyncMutex {
  mainMutex: Mutex;
  mutexArr: KeyValuePair<Mutex>[];

  constructor() {
    this.mutexArr = [];
    this.mainMutex = new Mutex();
  }

  public acquire(key: string) {
    const promise = new Promise<MutexInterface.Releaser>((resolve, reject) => {
      this.mainMutex.acquire().then((release) => {
        let mutex = this.mutexArr.find((m) => m.key === key);

        if (!mutex) {
          mutex = {
            key: key,
            value: new Mutex(),
          };

          this.mutexArr.push(mutex);
        }

        release();

        mutex.value.acquire().then((innerRelease) => {
          resolve(innerRelease);
        }, reject);
      }, reject);
    });

    return promise;
  }
}
