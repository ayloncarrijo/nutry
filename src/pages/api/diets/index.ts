import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { FullDiet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";

const include = {
  linkedFoods: { include: { food: true } },
  linkedRecipes: {
    include: {
      recipe: { include: { linkedFoods: { include: { food: true } } } },
    },
  },
  createdAsDailyBy: true,
  createdAsGoalBy: true,
};

const methods = {
  GET: async (req: TypedApiRequest, res: NextApiResponse<Array<FullDiet>>) => {
    const diets = await prisma.diet.findMany({
      include,
    });

    return res
      .status(HttpStatusCode.OK)
      .json(diets.map((diet) => DatabaseUtil.assignMacrosToDiet(diet)));
  },

  POST: async (
    req: TypedApiRequest<{
      linkedFoods: Array<{ foodId: string; quantity: number }>;
      linkedRecipes: Array<{ recipeId: string; quantity: number }>;
    }>,
    res: NextApiResponse<FullDiet>
  ) => {
    const { linkedFoods, linkedRecipes } = req.body;

    const diet = await prisma.diet.create({
      include,
      data: {
        linkedFoods: {
          createMany: {
            data: linkedFoods,
          },
        },
        linkedRecipes: {
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

export { include };
export default handle;
