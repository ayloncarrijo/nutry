import prisma from "lib/prisma";
import type { NextApiResponse } from "next";
import type { TypedApiRequest } from "types";
import type { FullRecipe, Paginated } from "types/api";
import HttpStatusCode from "types/HttpStatusCode";
import DatabaseUtil from "utils/DatabaseUtil";
import ObjectUtil from "utils/ObjectUtil";

const include = { attachedFoods: { include: { food: true } } };

const methods = {
  GET: async (
    req: TypedApiRequest<
      unknown,
      { limit: string; page: string; search?: string; createdBy: string }
    >,
    res: NextApiResponse<Paginated<FullRecipe>>
  ) => {
    const limit = Number(req.query.limit);

    const page = Number(req.query.page);

    const { createdBy } = req.query;

    const sqlFilter = {
      where: {
        createdBy,
        name: {
          mode: "insensitive",
          contains: req.query.search,
        },
      },
    } as const;

    const [total, recipes] = await prisma.$transaction([
      prisma.recipe.count(sqlFilter),
      prisma.recipe.findMany({
        ...sqlFilter,
        include,
        orderBy: {
          createdAt: "desc",
        },
        skip: limit * (page - 1),
        take: limit,
      }),
    ]);

    return res
      .status(HttpStatusCode.OK)
      .json([
        Math.ceil(total / limit),
        recipes.map((recipe) =>
          DatabaseUtil.assignMacrosToSnackContainer(recipe)
        ),
      ]);
  },

  POST: async (
    req: TypedApiRequest<{
      name: string;
      createdBy: string;
      attachedFoods: Array<{ foodId: string; quantity: number }>;
    }>,
    res: NextApiResponse<FullRecipe>
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

    return res
      .status(HttpStatusCode.OK)
      .json(DatabaseUtil.assignMacrosToSnackContainer(recipe));
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

export { include };
export default handle;
