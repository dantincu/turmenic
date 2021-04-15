import Hapi from "@Hapi/Hapi";
import Boom from "@hapi/boom";

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

  if ((result as any).isBoom === true) {
    response = boomToResponse(result as Boom.Boom, h);
  } else {
    response = h.response(result as Hapi.ResponseValue);
  }

  return response;
};
