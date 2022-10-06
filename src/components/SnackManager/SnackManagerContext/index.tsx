import type { SnackManagerProps } from "components/SnackManager";
import React from "react";
import type { SimpleAttachedFood, SimpleAttachedRecipe } from "types/api";

const SnackManagerContext = React.createContext<ReturnType<
  typeof useSnackManagerInitializer
> | null>(null);

const useSnackManagerInitializer = (props: SnackManagerProps) => {
  const [initialAttachedSnack, setInitialAttachedSnack] = React.useState<
    SimpleAttachedFood | SimpleAttachedRecipe | null
  >(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const attachedRecipes = !props.isFoodOnly ? props.attachedRecipes : undefined;

  const attachedSnacks = React.useMemo(
    () => [...(attachedRecipes ?? []), ...props.attachedFoods],
    [attachedRecipes, props.attachedFoods]
  );

  const hasSnack = attachedSnacks.length > 0;

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
