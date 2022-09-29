import type { SnackManagerProps } from "components/SnackManager";
import React from "react";
import type { SimpleAttachedFood, SimpleAttachedRecipe } from "types/api";

const SnackManagerContext = React.createContext<ReturnType<
  typeof useSnackManagerInitializer
> | null>(null);

const useSnackManagerInitializer = (props: SnackManagerProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const attachedRecipes = !props.isFoodOnly ? props.attachedRecipes : undefined;

  const attachedSnacks = React.useMemo(
    () => [...props.attachedFoods, ...(attachedRecipes ?? [])],
    [props.attachedFoods, attachedRecipes]
  );

  const hasSnack =
    props.attachedFoods.length > 0 || (attachedRecipes?.length ?? 0) > 0;

  const [initialAttachedSnack, setInitialAttachedSnack] = React.useState<
    SimpleAttachedFood | SimpleAttachedRecipe | null
  >(null);

  React.useEffect(() => {
    if (!isModalOpen) {
      setInitialAttachedSnack(null);
    }
  }, [isModalOpen]);

  return {
    ...props,
    isModalOpen,
    setIsModalOpen,
    hasSnack,
    attachedSnacks,
    initialAttachedSnack,
    setInitialAttachedSnack,
  };
};

const useSnackManager = () => {
  const value = React.useContext(SnackManagerContext);

  if (!value) {
    throw new Error("Must be used within a SnackManagerProvider");
  }

  return value;
};

export { useSnackManager, useSnackManagerInitializer };
export default SnackManagerContext;
