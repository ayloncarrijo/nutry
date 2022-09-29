import type {
  Macros,
  SimpleAttachedFood,
  SimpleAttachedRecipe,
  SnackContainer,
  WithMacros,
} from "types/api";

class DatabaseUtil {
  public static assignMacrosToSnackContainer<T extends SnackContainer>(
    container: T
  ): WithMacros<T> {
    const { attachedFoods, attachedRecipes = [] } = container;

    return {
      ...container,
      ...DatabaseUtil.calculateTotalMacronutrients(
        [...attachedFoods, ...attachedRecipes].map((attachedSnack) =>
          DatabaseUtil.assignMacrosToAttachedSnack(attachedSnack)
        )
      ),
    };
  }

  public static assignMacrosToAttachedSnack<
    T extends SimpleAttachedFood | SimpleAttachedRecipe
  >(attachedSnack: T): WithMacros<T> {
    const isRecipe = "recipe" in attachedSnack;

    const proportion = isRecipe ? 1 : attachedSnack.food.proportion;

    const rate = attachedSnack.quantity / proportion;

    const { carbohydrates, fats, proteins } = isRecipe
      ? DatabaseUtil.assignMacrosToSnackContainer(attachedSnack.recipe)
      : attachedSnack.food;

    return {
      ...attachedSnack,
      carbohydrates: carbohydrates * rate,
      fats: fats * rate,
      proteins: proteins * rate,
    };
  }

  public static calculateTotalMacronutrients(macros: Array<Macros>): Macros {
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
