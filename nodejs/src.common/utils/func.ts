export const getValue = <TValue>(
  func: (...args: any[]) => TValue,
  thisObj?: any,
  args?: any[]
): TValue => {
  let value: TValue;

  if (thisObj) {
    if (args) {
      value = func.apply(thisObj, args);
    } else {
      value = func.call(thisObj);
    }
  } else {
    value = func();
  }

  return value;
};

export const getValueAsync = async <TValue>(
  func: (...args: any[]) => Promise<TValue>,
  thisObj?: any,
  args?: any[]
): Promise<TValue> => {
  let value: TValue;

  if (thisObj) {
    if (args) {
      value = await func.apply(thisObj, args);
    } else {
      value = await func.call(thisObj);
    }
  } else {
    value = await func();
  }

  return value;
};

export const execute = (
  func: (...args: any[]) => void,
  thisObj?: any,
  args?: any[]
): void => {
  if (thisObj) {
    if (args) {
      func.apply(thisObj, args);
    } else {
      func.call(thisObj);
    }
  } else {
    func();
  }
};

export const executeAsync = async (
  func: (...args: any[]) => Promise<void>,
  thisObj?: any,
  args?: any[]
): Promise<void> => {
  if (thisObj) {
    if (args) {
      await func.apply(thisObj, args);
    } else {
      await func.call(thisObj);
    }
  } else {
    await func();
  }
};
