import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { FullDiet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";
import { include } from "./";

type Query = {
  id: string;
};

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<FullDiet>
  ) => {
    const { id } = req.query;

    const diet = await prisma.diet.findUniqueOrThrow({
      include,
      where: {
        id,
      },
    });

    return res
      .status(HttpStatusCode.OK)
      .json(DatabaseUtil.assignMacrosToDiet(diet));
  },

  PUT: async (
    req: TypedApiRequest<
      {
        linkedFoods: Array<{ foodId: string; quantity: number }>;
        linkedRecipes: Array<{ recipeId: string; quantity: number }>;
      },
      Query
    >,
    res: NextApiResponse<FullDiet>
  ) => {
    const { linkedFoods, linkedRecipes } = req.body;

    const { id } = req.query;

    const diet = await prisma.diet.update({
      include,
      where: {
        id,
      },
      data: {
        linkedFoods: {
          deleteMany: {},
          createMany: {
            data: linkedFoods,
          },
        },
        linkedRecipes: {
          deleteMany: {},
          createMany: {
            data: linkedRecipes,
          },
        },
      },
    });

    return res
      .status(HttpStatusCode.OK)
      .json(DatabaseUtil.assignMacrosToDiet(diet));
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
