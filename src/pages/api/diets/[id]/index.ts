import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Diet } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

type Query = {
  id: string;
};

const include = {
  attachedFoods: {
    orderBy: {
      createdAt: "asc",
    },
    include: { food: true },
  },
  attachedRecipes: {
    orderBy: {
      createdAt: "asc",
    },
    include: {
      recipe: { include: { attachedFoods: { include: { food: true } } } },
    },
  },
} as const;

const methods = {
  GET: async (
    req: TypedApiRequest<unknown, Query>,
    res: NextApiResponse<Diet>
  ) => {
    const { id } = req.query;

    const diet = await prisma.diet.findUniqueOrThrow({
      include,
      where: {
        id,
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
