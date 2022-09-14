import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

type Query = {
  name: string;
};

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<User | null>) => {
    const { name } = req.query as Query;

    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    return res.status(HttpStatusCode.OK).json(user);
  },

  PUT: async (req: NextApiRequest, res: NextApiResponse<User>) => {
    const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = req.body;

    const { name } = req.query as Query;

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

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = "NONE" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
