import type { SnackManagerProps } from "components/SnackManager";
import React from "react";

const SnackManagerContext = React.createContext<ReturnType<
  typeof useNewSnackManager
> | null>(null);

const useNewSnackManager = (props: SnackManagerProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => setIsModalOpen(true), []);

  const closeModal = React.useCallback(() => setIsModalOpen(false), []);

  const hasSnack =
    props.attachedFoods.length > 0 ||
    (!props.isFoodOnly && props.attachedRecipes.length > 0);

  return {
    ...props,
    isModalOpen,
    openModal,
    closeModal,
    hasSnack,
  };
};

const useSnackManager = () => {
  const value = React.useContext(SnackManagerContext);

  if (!value) {
    throw new Error("Must be used within a SnackManagerProvider");
  }

  return value;
};

export { useSnackManager, useNewSnackManager };
export default SnackManagerContext;
