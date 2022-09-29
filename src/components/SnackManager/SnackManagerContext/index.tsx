import type { SnackManagerProps } from "components/SnackManager";
import React from "react";
import type { AttachedFood, AttachedRecipe } from "types/api";

const SnackManagerContext = React.createContext<ReturnType<
  typeof useSnackManagerInitializer
> | null>(null);

const useSnackManagerInitializer = (props: SnackManagerProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => setIsModalOpen(true), []);

  const closeModal = React.useCallback(() => setIsModalOpen(false), []);

  const attachedRecipes = !props.isFoodOnly ? props.attachedRecipes : undefined;

  const attachedSnacks = React.useMemo(
    () => [...props.attachedFoods, ...(attachedRecipes ?? [])],
    [props.attachedFoods, attachedRecipes]
  );

  const hasSnack =
    props.attachedFoods.length > 0 || (attachedRecipes?.length ?? 0) > 0;

  const [updatingSnack, setUpdatingSnack] = React.useState<
    AttachedFood | AttachedRecipe | null
  >(null);

  return {
    ...props,
    isModalOpen,
    openModal,
    closeModal,
    hasSnack,
    attachedSnacks,
    updatingSnack,
    setUpdatingSnack,
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
