import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { AttachedFood } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  POST: async (
    req: TypedApiRequest<{
      quantity: number;
      foodId: string;
      dietId?: string;
      recipeId?: string;
    }>,
    res: NextApiResponse<AttachedFood>
  ) => {
    const { quantity, foodId, dietId, recipeId } = req.body;

    if (!dietId && !recipeId) {
      return res.status(HttpStatusCode.BAD_REQUEST).end();
    }

    const attachedFood = await prisma.attachedFood.create({
      include: {
        food: true,
      },
      data: {
        quantity,
        foodId,
        dietId,
        recipeId,
      },
    });

    return res.status(HttpStatusCode.OK).json(attachedFood);
  },
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = "" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
