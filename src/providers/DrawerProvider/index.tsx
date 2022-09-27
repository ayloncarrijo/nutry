import React from "react";

const DrawerContext = React.createContext<ReturnType<
  typeof useDrawerInitializer
> | null>(null);

function DrawerProvider({ children }: React.PropsWithChildren): JSX.Element {
  const value = useDrawerInitializer();

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

function useDrawerInitializer() {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    setIsOpen,
  };
}

function useDrawer() {
  const value = React.useContext(DrawerContext);

  if (!value) {
    throw new Error("Must be used within a DrawerProvider");
  }

  return value;
}

export { useDrawer };
export default DrawerProvider;
