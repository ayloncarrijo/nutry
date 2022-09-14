import type * as Prisma from "@prisma/client";
export * from "@prisma/client";

export type FullDiet = WithMacros<Diet>;

export type FullRecipe = WithMacros<Recipe>;

export type Diet = Prisma.Diet & {
  linkedFoods: Array<LinkedFood>;
  linkedRecipes: Array<LinkedRecipe>;
};

export type Food = Prisma.Food;

export type Recipe = Prisma.Recipe & {
  linkedFoods: Array<LinkedFood>;
};

export type LinkedFood = Prisma.LinkedFood & {
  food: Food;
};

export type LinkedRecipe = Prisma.LinkedRecipe & {
  recipe: Recipe;
};

export type Macros = {
  carbohydrates: number;
  fats: number;
  proteins: number;
};

export type WithMacros<T extends Record<string, unknown>> = T & Macros;
