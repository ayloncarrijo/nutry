import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Food, Measurement, Paginated } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, { limit: string; page: string }>,
    res: NextApiResponse<Paginated<Food>>
  ) => {
    const limit = Number(req.query.limit);

    const page = Number(req.query.page);

    const [total, foods] = await prisma.$transaction([
      prisma.food.count(),
      prisma.food.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: limit * (page - 1),
        take: limit,
      }),
    ]);

    return res
      .status(HttpStatusCode.OK)
      .json([Math.ceil(total / limit), foods]);
  },

  POST: async (
    req: TypedApiRequest<{
      measurement: Measurement;
      proportion: number;
      name: string;
      carbohydrates: number;
      fats: number;
      proteins: number;
    }>,
    res: NextApiResponse<Food>
  ) => {
    const { measurement, proportion, name, carbohydrates, fats, proteins } =
      req.body;

    const food = await prisma.food.create({
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
