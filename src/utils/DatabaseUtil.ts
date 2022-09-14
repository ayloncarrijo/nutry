import type {
  Diet,
  LinkedFood,
  LinkedRecipe,
  Macros,
  Recipe,
  WithMacros,
} from "types/api";

class DatabaseUtil {
  public static assignMacrosToLinkedFood(
    linkedFood: LinkedFood
  ): WithMacros<LinkedFood> {
    const proportion = linkedFood.quantity / linkedFood.food.proportion;

    return {
      ...linkedFood,
      carbohydrates: proportion * linkedFood.food.carbohydrates,
      fats: proportion * linkedFood.food.fats,
      proteins: proportion * linkedFood.food.proteins,
    };
  }

  public static assignMacrosToLinkedRecipe(
    linkedRecipe: LinkedRecipe
  ): WithMacros<LinkedRecipe> {
    const { carbohydrates, fats, proteins } = DatabaseUtil.assignMacrosToRecipe(
      linkedRecipe.recipe
    );

    return {
      ...linkedRecipe,
      carbohydrates: linkedRecipe.quantity * carbohydrates,
      fats: linkedRecipe.quantity * fats,
      proteins: linkedRecipe.quantity * proteins,
    };
  }

  public static assignMacrosToRecipe(recipe: Recipe): WithMacros<Recipe> {
    return {
      ...recipe,
      ...DatabaseUtil.calculateTotalMacros(
        recipe.linkedFoods.map((linkedFood) =>
          DatabaseUtil.assignMacrosToLinkedFood(linkedFood)
        )
      ),
    };
  }

  public static assignMacrosToDiet(diet: Diet): WithMacros<Diet> {
    return {
      ...diet,
      ...DatabaseUtil.calculateTotalMacros([
        ...diet.linkedFoods.map((linkedFood) =>
          DatabaseUtil.assignMacrosToLinkedFood(linkedFood)
        ),
        ...diet.linkedRecipes.map((linkedRecipe) =>
          DatabaseUtil.assignMacrosToLinkedRecipe(linkedRecipe)
        ),
      ]),
    };
  }

  public static calculateTotalMacros(macros: Array<Macros>): Macros {
    return macros.reduce(
      (accumulator, { carbohydrates, fats, proteins }) => ({
        carbohydrates: accumulator.carbohydrates + carbohydrates,
        fats: accumulator.fats + fats,
        proteins: accumulator.proteins + proteins,
      }),
      { carbohydrates: 0, fats: 0, proteins: 0 }
    );
  }
}

export default DatabaseUtil;
