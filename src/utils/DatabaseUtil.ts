import type {
  AttachedFood,
  AttachedRecipe,
  Diet,
  Macros,
  Recipe,
  WithMacros,
} from "types/api";

class DatabaseUtil {
  public static assignMacrosToRecipe(recipe: Recipe): WithMacros<Recipe> {
    return {
      ...recipe,
      ...DatabaseUtil.calculateTotalMacros(
        recipe.attachedFoods.map((attachedFood) =>
          DatabaseUtil.assignMacrosToAttachedFood(attachedFood)
        )
      ),
    };
  }

  public static assignMacrosToDiet(diet: Diet): WithMacros<Diet> {
    return {
      ...diet,
      ...DatabaseUtil.calculateTotalMacros([
        ...diet.attachedFoods.map((attachedFood) =>
          DatabaseUtil.assignMacrosToAttachedFood(attachedFood)
        ),
        ...diet.attachedRecipes.map((attachedRecipe) =>
          DatabaseUtil.assignMacrosToAttachedRecipe(attachedRecipe)
        ),
      ]),
    };
  }

  public static assignMacrosToAttachedFood(
    attachedFood: AttachedFood
  ): WithMacros<AttachedFood> {
    const proportion = attachedFood.quantity / attachedFood.food.proportion;

    return {
      ...attachedFood,
      carbohydrates: proportion * attachedFood.food.carbohydrates,
      fats: proportion * attachedFood.food.fats,
      proteins: proportion * attachedFood.food.proteins,
    };
  }

  public static assignMacrosToAttachedRecipe(
    attachedRecipe: AttachedRecipe
  ): WithMacros<AttachedRecipe> {
    const { carbohydrates, fats, proteins } = DatabaseUtil.assignMacrosToRecipe(
      attachedRecipe.recipe
    );

    return {
      ...attachedRecipe,
      carbohydrates: attachedRecipe.quantity * carbohydrates,
      fats: attachedRecipe.quantity * fats,
      proteins: attachedRecipe.quantity * proteins,
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
