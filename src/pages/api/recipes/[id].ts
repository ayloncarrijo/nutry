import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Recipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";
import { include } from "./";

type Query = {
  id: string;
};

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<Recipe>
  ) => {
    const { id } = req.query;

    const recipe = await prisma.recipe.findUniqueOrThrow({
      include,
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).json(recipe);
  },

  PUT: async (
    req: TypedApiRequest<
      {
        name: string;
        attachedFoods: Array<{ foodId: string; quantity: number }>;
      },
      Query
    >,
    res: NextApiResponse<Recipe>
  ) => {
    const { id } = req.query;

    const { name, attachedFoods } = req.body;

    const recipe = await prisma.recipe.update({
      include,
      where: {
        id,
      },
      data: {
        name,
        attachedFoods: {
          deleteMany: {},
          createMany: {
            data: attachedFoods,
          },
        },
      },
    });

    return res.status(HttpStatusCode.OK).json(recipe);
  },

  DELETE: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<never>
  ) => {
    const { id } = req.query;

    await prisma.recipe.delete({
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
