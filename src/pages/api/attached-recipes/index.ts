import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { AttachedRecipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const include = {
  recipe: {
    include: {
      attachedFoods: {
        include: {
          food: true,
        },
      },
    },
  },
};

const methods = {
  POST: async (
    req: TypedApiRequest<{
      quantity: number;
      dietId: string;
      recipeId: string;
    }>,
    res: NextApiResponse<AttachedRecipe>
  ) => {
    const { quantity, recipeId, dietId } = req.body;

    const attachedRecipe = await prisma.attachedRecipe.create({
      include,
      data: {
        quantity,
        recipeId,
        dietId,
      },
    });

    return res.status(HttpStatusCode.OK).json(attachedRecipe);
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
