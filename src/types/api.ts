import type * as Prisma from "@prisma/client";
export * from "@prisma/client";

export type Paginated<T> = [number, Array<T>];

export type NotCreated<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type FullDiet = WithMacros<Diet>;

export type FullRecipe = WithMacros<Recipe>;

export type Diet = Prisma.Diet & {
  attachedFoods: Array<AttachedFood>;
  attachedRecipes: Array<AttachedRecipe>;
};

export type Food = Prisma.Food;

export type Recipe = Prisma.Recipe & {
  attachedFoods: Array<AttachedFood>;
};

export type AttachedFood = Prisma.AttachedFood & {
  food: Food;
};

export type AttachedRecipe = Prisma.AttachedRecipe & {
  recipe: Recipe;
};

export type SnackContainer = {
  attachedFoods: Array<AttachedFood>;
  attachedRecipes?: Array<AttachedRecipe>;
};

export type Macros = {
  carbohydrates: number;
  fats: number;
  proteins: number;
};

export type WithMacros<T extends Record<string, unknown>> = T & Macros;
