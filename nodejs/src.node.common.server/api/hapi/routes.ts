import Hapi from "@Hapi/Hapi";
import Boom from "@hapi/boom";
import { hasValue } from "../../../src.common/utils/types.js";

export const handleRoute = async <TResult>(
  handler: () => Promise<TResult | Boom.Boom>
) => {
  let result: TResult | Boom.Boom | null = null;

  try {
    result = await handler();
  } catch (err) {
    result = Boom.boomify(err);
  }

  return result;
};

export const handleArgRoute = async <TArg, TResult>(
  handler: (arg: TArg) => Promise<TResult | Boom.Boom>,
  arg: TArg
) => {
  let result: TResult | Boom.Boom | null = null;

  try {
    result = await handler(arg);
  } catch (err) {
    result = Boom.boomify(err);
  }

  return result;
};

export const boomToResponse = (err: Boom.Boom, h: Hapi.ResponseToolkit) => {
  const response = h.response(err.output.payload).code(err.output.statusCode);

  return response;
};

export const handleResponse = <TResult>(
  result: TResult | Boom.Boom,
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  let response: Hapi.ResponseObject | null = null;

  if (hasValue(result) === false || (result as any).isBoom === true) {
    response = boomToResponse((result || Boom.internal()) as Boom.Boom, h);
  } else if (typeof result === "object") {
    response = h.response(result as object);
  } else {
    const resultAsAny = result as any;
    if (typeof resultAsAny.toString === "function") {
      response = h.response(resultAsAny.toString());
    } else {
      response = h.response(`${resultAsAny}`);
    }
  }

  return response;
};
