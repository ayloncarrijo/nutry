import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Diet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const include = {
  attachedFoods: {
    orderBy: {
      createdAt: "desc",
    },
    include: { food: true },
  },
  attachedRecipes: {
    orderBy: {
      createdAt: "desc",
    },
    include: {
      recipe: { include: { attachedFoods: { include: { food: true } } } },
    },
  },
} as const;

const methods = {
  GET: async (req: TypedApiRequest, res: NextApiResponse<Array<Diet>>) => {
    const diets = await prisma.diet.findMany({
      include,
    });

    return res.status(HttpStatusCode.OK).json(diets);
  },

  POST: async (
    req: TypedApiRequest<{
      attachedFoods: Array<{ foodId: string; quantity: number }>;
      attachedRecipes: Array<{ recipeId: string; quantity: number }>;
    }>,
    res: NextApiResponse<Diet>
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

export { include };
export default handle;
