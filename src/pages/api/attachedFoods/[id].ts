import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { AttachedFood } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

type Query = {
  id: string;
};

const methods = {
  PUT: async (
    req: TypedApiRequest<{ quantity: number }, Query>,
    res: NextApiResponse<AttachedFood>
  ) => {
    const { id } = req.query;

    const { quantity } = req.body;

    const attachedFood = await prisma.attachedFood.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
      include: {
        food: true,
      },
    });

    return res.status(HttpStatusCode.OK).json(attachedFood);
  },

  DELETE: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<never>
  ) => {
    const { id } = req.query;

    await prisma.attachedFood.delete({
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
  const { method = "" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
