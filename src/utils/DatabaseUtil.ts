import type {
  AttachedFood,
  AttachedRecipe,
  Macros,
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
      ...DatabaseUtil.calculateTotalMacros(
        [...attachedFoods, ...attachedRecipes].map((attachedSnack) =>
          DatabaseUtil.assignMacrosToAttachedSnack(attachedSnack)
        )
      ),
    };
  }

  public static assignMacrosToAttachedSnack<
    T extends AttachedFood | AttachedRecipe
  >(attachedSnack: T): WithMacros<T> {
    const isRecipe = "recipe" in attachedSnack;

    const proportion = isRecipe
      ? attachedSnack.quantity
      : attachedSnack.quantity / attachedSnack.food.proportion;

    const { carbohydrates, fats, proteins } = isRecipe
      ? DatabaseUtil.assignMacrosToSnackContainer(attachedSnack.recipe)
      : attachedSnack.food;

    return {
      ...attachedSnack,
      carbohydrates: carbohydrates * proportion,
      fats: fats * proportion,
      proteins: proteins * proportion,
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
