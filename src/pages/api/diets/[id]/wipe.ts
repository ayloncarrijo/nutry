import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Diet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";
import { include } from "./";

type Query = {
  id: string;
};

const methods = {
  POST: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<Diet>
  ) => {
    const { id } = req.query;

    const diet = await prisma.diet.update({
      include,
      where: {
        id,
      },
      data: {
        attachedFoods: {
          deleteMany: {},
        },
        attachedRecipes: {
          deleteMany: {},
        },
      },
    });

    return res.status(HttpStatusCode.OK).json(diet);
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
