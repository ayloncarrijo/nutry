import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Food, NotCreated, Paginated } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  GET: async (
    req: TypedApiRequest<
      unknown,
      { limit: string; page: string; search?: string }
    >,
    res: NextApiResponse<Paginated<Food>>
  ) => {
    const limit = Number(req.query.limit);

    const page = Number(req.query.page);

    const where = {
      name: {
        contains: req.query.search,
      },
    };

    const [total, foods] = await prisma.$transaction([
      prisma.food.count({ where }),
      prisma.food.findMany({
        where,
        orderBy: {
          name: "asc",
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
    req: TypedApiRequest<NotCreated<Food>>,
    res: NextApiResponse<Food>
  ) => {
    const {
      measurement,
      proportion,
      name,
      carbohydrates,
      fats,
      proteins,
      reference,
    } = req.body;

    const food = await prisma.food.create({
      data: {
        measurement,
        proportion,
        name,
        carbohydrates,
        fats,
        proteins,
        reference,
      },
    });

    return res.status(HttpStatusCode.OK).json(food);
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
