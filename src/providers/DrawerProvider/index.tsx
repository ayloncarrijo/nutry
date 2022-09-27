import React from "react";

const DrawerContext = React.createContext<ReturnType<
  typeof useNewDrawer
> | null>(null);

function DrawerProvider({ children }: React.PropsWithChildren): JSX.Element {
  const value = useNewDrawer();

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

const useNewDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};

const useDrawer = () => {
  const value = React.useContext(DrawerContext);

  if (!value) {
    throw new Error("Must be used within a DrawerProvider");
  }

  return value;
};

export { useDrawer };
export default DrawerProvider;
