import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FullRecipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";
import { include } from "./";

type Query = {
  id: string;
};

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<FullRecipe>) => {
    const { id } = req.query as Query;

    const recipe = await prisma.recipe.findUniqueOrThrow({
      include,
      where: {
        id,
      },
    });

    return res
      .status(HttpStatusCode.OK)
      .json(DatabaseUtil.assignMacrosToRecipe(recipe));
  },

  PUT: async (req: NextApiRequest, res: NextApiResponse<FullRecipe>) => {
    const { id } = req.query as Query;

    const { name, linkedFoods } = req.body;

    const recipe = await prisma.recipe.update({
      include,
      where: {
        id,
      },
      data: {
        name,
        linkedFoods: {
          deleteMany: {},
          createMany: {
            data: linkedFoods,
          },
        },
      },
    });

    return res
      .status(HttpStatusCode.OK)
      .json(DatabaseUtil.assignMacrosToRecipe(recipe));
  },

  DELETE: async (req: NextApiRequest, res: NextApiResponse<never>) => {
    const { id } = req.query as Query;

    await prisma.recipe.delete({
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).end();
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
