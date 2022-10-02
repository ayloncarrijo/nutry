import type {
  Macros,
  SimpleAttachedFood,
  SimpleAttachedRecipe,
  SnackContainer,
} from "types/api";

class DatabaseUtil {
  public static getMacrosFromSnackContainer(container: SnackContainer): Macros {
    const { attachedFoods, attachedRecipes = [] } = container;

    return [...attachedFoods, ...attachedRecipes]
      .map((attachedSnack) =>
        DatabaseUtil.getMacrosFromAttachedSnack(attachedSnack)
      )
      .reduce(
        (accumulator, { carbohydrates, fats, proteins }) => ({
          carbohydrates: accumulator.carbohydrates + carbohydrates,
          fats: accumulator.fats + fats,
          proteins: accumulator.proteins + proteins,
        }),
        { carbohydrates: 0, fats: 0, proteins: 0 }
      );
  }

  public static getMacrosFromAttachedSnack(
    attachedSnack: SimpleAttachedFood | SimpleAttachedRecipe
  ): Macros {
    const isAttachedRecipe = "recipe" in attachedSnack;

    const { carbohydrates, fats, proteins } = isAttachedRecipe
      ? DatabaseUtil.getMacrosFromSnackContainer(attachedSnack.recipe)
      : attachedSnack.food;

    const rate =
      attachedSnack.quantity /
      (isAttachedRecipe ? 1 : attachedSnack.food.proportion);

    return {
      carbohydrates: carbohydrates * rate,
      fats: fats * rate,
      proteins: proteins * rate,
    };
  }
}

export default DatabaseUtil;
