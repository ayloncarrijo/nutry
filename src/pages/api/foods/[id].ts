import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Food, Measurement } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

type Query = {
  id: string;
};

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<Food>
  ) => {
    const { id } = req.query;

    const food = await prisma.food.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).json(food);
  },

  PUT: async (
    req: TypedApiRequest<
      {
        measurement: Measurement;
        proportion: number;
        name: string;
        carbohydrates: number;
        fats: number;
        proteins: number;
      },
      Query
    >,
    res: NextApiResponse<Food>
  ) => {
    const { id } = req.query;

    const { measurement, proportion, name, carbohydrates, fats, proteins } =
      req.body;

    const food = await prisma.food.update({
      where: {
        id,
      },
      data: {
        measurement,
        proportion,
        name,
        carbohydrates,
        fats,
        proteins,
      },
    });

    return res.status(HttpStatusCode.OK).json(food);
  },

  DELETE: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<never>
  ) => {
    const { id } = req.query;

    await prisma.food.delete({
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
  const { method = "NONE" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
