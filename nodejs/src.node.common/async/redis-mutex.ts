import { Mutex } from "redis-semaphore";
import Redis from "ioredis";
import {
  executeAsync,
  execute,
  getValueAsync,
  getValue,
} from "../../src.common/utils/func.js";

export const getRedisClient = (redisPort?: number) => {
  let client: Redis.Redis;

  if (redisPort) {
    client = new Redis(redisPort);
  } else {
    client = new Redis();
  }

  return client;
};

export const getMutex = (redisClient: Redis.Redis, lockName: string) => {
  const mutex = new Mutex(redisClient, lockName);
  return mutex;
};

export const executeWithMutex = async (
  mutex: Mutex,
  func: () => void,
  thisObj?: any,
  args?: any[]
): Promise<void> => {
  try {
    execute(func, thisObj, args);
  } finally {
    await mutex.release();
  }
};

export const executeWithMutexAsync = async (
  mutex: Mutex,
  func: () => Promise<void>,
  thisObj?: any,
  args?: any[]
): Promise<void> => {
  await mutex.acquire();

  try {
    await executeAsync(func, thisObj, args);
  } finally {
    await mutex.release();
  }
};

export const getValueWithMutex = async <TValue>(
  mutex: Mutex,
  func: () => TValue,
  thisObj?: any,
  args?: any[]
): Promise<TValue> => {
  let value: TValue;

  try {
    value = getValue(func, thisObj, args);
  } finally {
    await mutex.release();
  }

  return value;
};

export const getValueWithMutexAsync = async <TValue>(
  mutex: Mutex,
  func: () => Promise<TValue>,
  thisObj?: any,
  args?: any[]
): Promise<TValue> => {
  let value: TValue;

  try {
    value = await getValue(func, thisObj, args);
  } finally {
    await mutex.release();
  }

  return value;
};

export const executeLocking = async (
  lockName: string,
  func: () => void,
  thisObj?: any,
  args?: any[]
): Promise<void> => {
  const redisClient = getRedisClient();
  const mutex = getMutex(redisClient, lockName);

  await executeWithMutex(mutex, func, thisObj, args);
};

export const executeLockingAsync = async (
  lockName: string,
  func: () => Promise<void>,
  thisObj?: any,
  args?: any[]
): Promise<void> => {
  const redisClient = getRedisClient();
  const mutex = getMutex(redisClient, lockName);

  await executeWithMutexAsync(mutex, func, thisObj, args);
};

export const getValueLocking = async <TValue>(
  lockName: string,
  func: () => TValue,
  thisObj?: any,
  args?: any[]
): Promise<TValue> => {
  const redisClient = getRedisClient();
  const mutex = getMutex(redisClient, lockName);

  const value = await getValueWithMutex(mutex, func, thisObj, args);
  return value;
};

export const getValueLockingAsync = async <TValue>(
  lockName: string,
  func: () => Promise<TValue>,
  thisObj?: any,
  args?: any[]
): Promise<TValue> => {
  const redisClient = getRedisClient();
  const mutex = getMutex(redisClient, lockName);

  const value = await getValueWithMutexAsync(mutex, func, thisObj, args);
  return value;
};
