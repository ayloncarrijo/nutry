import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FullDiet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";
import { include } from "./";

type Query = {
  id: string;
};

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<FullDiet>) => {
    const { id } = req.query as Query;

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

  PUT: async (req: NextApiRequest, res: NextApiResponse<FullDiet>) => {
    const { linkedFoods, linkedRecipes } = req.body;

    const { id } = req.query as Query;

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

  DELETE: async (req: NextApiRequest, res: NextApiResponse<never>) => {
    const { id } = req.query as Query;

    await prisma.diet.delete({
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
