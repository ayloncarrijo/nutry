import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { Paginated, Recipe } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import ObjectUtil from "utils/ObjectUtil";

const include = {
  attachedFoods: {
    orderBy: { food: { name: "asc" } },
    include: { food: true },
  },
} as const;

const methods = {
  GET: async (
    req: TypedApiRequest<
      unknown,
      { limit: string; page: string; search?: string; createdBy: string }
    >,
    res: NextApiResponse<Paginated<Recipe>>
  ) => {
    const limit = Number(req.query.limit);

    const page = Number(req.query.page);

    const { createdBy } = req.query;

    if (!createdBy) {
      return res.status(HttpStatusCode.BAD_REQUEST).end();
    }

    const where = {
      createdBy,
      name: {
        contains: req.query.search,
      },
    };

    const [total, recipes] = await prisma.$transaction([
      prisma.recipe.count({ where }),
      prisma.recipe.findMany({
        include,
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
      .json([Math.ceil(total / limit), recipes]);
  },

  POST: async (
    req: TypedApiRequest<{
      name: string;
      createdBy: string;
      attachedFoods: Array<{ foodId: string; quantity: number }>;
    }>,
    res: NextApiResponse<Recipe>
  ) => {
    const { name, createdBy, attachedFoods } = req.body;

    const recipe = await prisma.recipe.create({
      include,
      data: {
        name,
        createdBy,
        attachedFoods: {
          createMany: {
            data: attachedFoods,
          },
        },
      },
    });

    return res.status(HttpStatusCode.OK).json(recipe);
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
