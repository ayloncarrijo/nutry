import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { User } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

type Query = {
  name: string;
};

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<User | null>
  ) => {
    const { name } = req.query;

    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    return res.status(HttpStatusCode.OK).json(user);
  },

  PUT: async (
    req: TypedApiRequest<
      {
        weight: number;
        carbohydratesPerKg: number;
        fatsPerKg: number;
        proteinsPerKg: number;
      },
      Query
    >,
    res: NextApiResponse<User>
  ) => {
    const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = req.body;

    const { name } = req.query;

    const user = await prisma.user.update({
      where: {
        name,
      },
      data: {
        weight,
        carbohydratesPerKg,
        fatsPerKg,
        proteinsPerKg,
      },
    });

    return res.status(HttpStatusCode.OK).json(user);
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
