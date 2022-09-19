import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { FullDiet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";

const include = {
  attachedFoods: { include: { food: true } },
  attachedRecipes: {
    include: {
      recipe: { include: { attachedFoods: { include: { food: true } } } },
    },
  },
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
      attachedFoods: Array<{ foodId: string; quantity: number }>;
      attachedRecipes: Array<{ recipeId: string; quantity: number }>;
    }>,
    res: NextApiResponse<FullDiet>
  ) => {
    const { attachedFoods, attachedRecipes } = req.body;

    const diet = await prisma.diet.create({
      include,
      data: {
        attachedFoods: {
          createMany: {
            data: attachedFoods,
          },
        },
        attachedRecipes: {
          createMany: {
            data: attachedRecipes,
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
