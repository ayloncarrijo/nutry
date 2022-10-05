import type { NextApiRequest, NextApiResponse } from "next";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  PUT: async (req: NextApiRequest, res: NextApiResponse<never>) => {
    return res.status(HttpStatusCode.OK).end();
  },

  DELETE: async (req: NextApiRequest, res: NextApiResponse<never>) => {
    return res.status(HttpStatusCode.OK).end();
  },
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = "" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
