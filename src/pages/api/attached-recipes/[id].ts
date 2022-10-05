import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  GET: async (req: TypedApiRequest, res: NextApiResponse<never>) => {
    return res.status(HttpStatusCode.OK).end();
  },

  POST: async (req: TypedApiRequest, res: NextApiResponse<never>) => {
    return res.status(HttpStatusCode.OK).end();
  },
};

const handle = async (
  req: TypedApiRequest<never, never>,
  res: NextApiResponse
) => {
  const { method = "" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
