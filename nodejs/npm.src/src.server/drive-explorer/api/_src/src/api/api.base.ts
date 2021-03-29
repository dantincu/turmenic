import Boom from "@hapi/boom";

export const handleRoute = async <TResult>(handler: () => Promise<TResult>) => {
  let result: TResult | null = null;

  try {
    result = await handler();
  } catch (err) {
    const boomErr = Boom.boomify(err);
    throw boomErr;
  }

  return result;
};

export const handleArgRoute = async <TArg, TResult>(
  handler: (arg: TArg) => Promise<TResult>,
  arg: TArg
) => {
  let result: TResult | null = null;

  try {
    result = await handler(arg);
  } catch (err) {
    const boomErr = Boom.boomify(err);
    throw boomErr;
  }

  return result;
};
