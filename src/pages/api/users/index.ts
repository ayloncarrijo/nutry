import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
    const users = await prisma.user.findMany();

    return res.status(HttpStatusCode.OK).json(users);
  },

  POST: async (req: NextApiRequest, res: NextApiResponse<User>) => {
    const { name } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        dailyDiet: {
          create: {},
        },
        goalDiet: {
          create: {},
        },
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
