import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { FullRecipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";

const include = { linkedFoods: { include: { food: true } } };

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, { user: string }>,
    res: NextApiResponse<Array<FullRecipe>>
  ) => {
    const { user } = req.query;

    const recipes = await prisma.recipe.findMany({
      include,
      where: {
        createdBy: user,
      },
    });

    return res
      .status(HttpStatusCode.OK)
      .json(recipes.map((recipe) => DatabaseUtil.assignMacrosToRecipe(recipe)));
  },

  POST: async (
    req: TypedApiRequest<{
      name: string;
      user: string;
      linkedFoods: Array<{ foodId: string; quantity: number }>;
    }>,
    res: NextApiResponse<FullRecipe>
  ) => {
    const { name, user, linkedFoods } = req.body;

    const recipe = await prisma.recipe.create({
      include,
      data: {
        name,
        createdBy: user,
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
