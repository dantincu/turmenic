export class AsyncSingleton<T> {
  private func: () => Promise<T>;
  private promise: Promise<T> | null;
  private instanceValue: T | null;
  private promiseResolved: boolean;

  constructor(func: () => Promise<T>, autoInit: boolean = true) {
    if (!func) {
      throw new Error(
        "Cannot initialise an async singleton without an async callback!"
      );
    }

    this.promiseResolved = false;
    this.instanceValue = null;
    this.func = func;
    this.promise = null;

    this.fireCallback(autoInit);
  }

  public async instance(): Promise<T> {
    let promise: Promise<T>;

    if (this.promiseResolved) {
      promise = Promise.resolve(<T>this.instanceValue);
    } else {
      if (!this.promise) {
        this.promise = <Promise<T>>this.fireCallback(true);
      }

      promise = this.promise;
    }

    return promise;
  }

  private fireCallback(fire: boolean) {
    if (fire) {
      this.promise = this.func();
      this.promise.then((value) => {
        this.instanceValue = value;
        this.promiseResolved = true;
      });
    }

    return this.promise;
  }
}
