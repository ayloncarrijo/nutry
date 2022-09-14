import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Food } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const methods = {
  GET: async (req: NextApiRequest, res: NextApiResponse<Food[]>) => {
    const foods = await prisma.food.findMany();

    return res.status(HttpStatusCode.OK).json(foods);
  },

  POST: async (req: NextApiRequest, res: NextApiResponse<Food>) => {
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

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = "NONE" } = req;

  if (ObjectUtil.isKeyOf(methods, method)) {
    return methods[method](req, res);
  }

  return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default handle;
