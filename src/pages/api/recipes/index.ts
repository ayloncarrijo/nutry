import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FullRecipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";

const include = { linkedFoods: { include: { food: true } } };

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<FullRecipe[]>) => {
    const recipes = await prisma.recipe.findMany({
      include,
    });

    return res
      .status(HttpStatusCode.OK)
      .json(recipes.map(DatabaseUtil.assignMacrosToRecipe));
  },

  POST: async (req: NextApiRequest, res: NextApiResponse<FullRecipe>) => {
    const { name, linkedFoods } = req.body;

    const recipe = await prisma.recipe.create({
      include,
      data: {
        name,
        linkedFoods: {
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
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = "NONE" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export { include };
export default handle;
