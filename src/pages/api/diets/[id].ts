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
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<Diet>
  ) => {
    const { id } = req.query;

    const diet = await prisma.diet.findUniqueOrThrow({
      include,
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).json(diet);
  },

  PUT: async (
    req: TypedApiRequest<
      {
        attachedFoods: Array<{ foodId: string; quantity: number }>;
        attachedRecipes: Array<{ recipeId: string; quantity: number }>;
      },
      Query
    >,
    res: NextApiResponse<Diet>
  ) => {
    const { attachedFoods, attachedRecipes } = req.body;

    const { id } = req.query;

    const diet = await prisma.diet.update({
      include,
      where: {
        id,
      },
      data: {
        attachedFoods: {
          deleteMany: {},
          createMany: {
            data: attachedFoods,
          },
        },
        attachedRecipes: {
          deleteMany: {},
          createMany: {
            data: attachedRecipes,
          },
        },
      },
    });

    return res.status(HttpStatusCode.OK).json(diet);
  },

  DELETE: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<never>
  ) => {
    const { id } = req.query;

    await prisma.diet.delete({
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).end();
  },
};

const handle = async (
  req: TypedApiRequest<never, never>,
  res: NextApiResponse
) => {
  const { method = "NONE" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
