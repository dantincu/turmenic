export interface PromObj<T> {
  prom: Promise<T>;
  resolved?: T | undefined;
  rejected?: any | undefined;
  completed?: boolean;
}

export const waitAll = <T>(promArr: Promise<T>[]) => {
  const promise = new Promise<PromObj<T>[]>((resolve, reject) => {
    const resOrRejIfAllCompleted = () => {
      let allCompleted = true;

      promObjArr.forEach((promObj) => {
        if (allCompleted) {
          if (promObj.completed !== true) {
            allCompleted = false;
          }
        }
      });

      if (allCompleted) {
        resolve(promObjArr);
      }
    };

    const promObjArr = promArr.map((prom) => {
      const promObj = {
        prom: prom,
      } as PromObj<T>;

      prom.then((val) => {
        promObj.resolved = val;
      });
      prom.catch((err) => {
        promObj.rejected = err;
      });
      prom.finally(() => {
        promObj.completed = true;
        resOrRejIfAllCompleted();
      });

      return promObj;
    });
  });

  return promise;
};
