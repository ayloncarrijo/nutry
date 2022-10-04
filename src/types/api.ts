import type * as Prisma from "@prisma/client";
export * from "@prisma/client";

export type AttachedFood = Prisma.AttachedFood & {
  food: Food;
};

export type AttachedRecipe = Prisma.AttachedRecipe & {
  recipe: Recipe;
};

export type SimpleAttachedFood = Pick<AttachedFood, "id" | "quantity" | "food">;

export type SimpleAttachedRecipe = Pick<
  AttachedRecipe,
  "id" | "quantity" | "recipe"
>;

export type SnackContainer = {
  attachedFoods: Array<AttachedFood>;
  attachedRecipes?: Array<AttachedRecipe>;
};

export type Diet = Prisma.Diet & {
  attachedFoods: Array<AttachedFood>;
  attachedRecipes: Array<AttachedRecipe>;
};

export type Food = Prisma.Food;

export type Recipe = Prisma.Recipe & {
  attachedFoods: Array<AttachedFood>;
};

export type Macros = {
  carbohydrates: number;
  fats: number;
  proteins: number;
};

export type Paginated<T> = [number, Array<T>];

export type NotCreated<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
