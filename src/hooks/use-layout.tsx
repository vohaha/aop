import { createContext, useCallback, useContext, useState } from 'react';

export interface LayoutContextValue {
  isAsideOpen: boolean;
  asideToggle: () => void;
}

const LayoutContextValueDefault = {
  isAsideOpen: false,
  asideToggle: () => {},
};

export const LayoutContext = createContext<LayoutContextValue>(
  LayoutContextValueDefault,
);

export const useLayout = () => useContext(LayoutContext);

export const useLayoutProvider = () => {
  const [isAsideOpen, setAsideOpen] = useState(
    LayoutContextValueDefault.isAsideOpen,
  );
  const asideToggle = useCallback(() => {
    setAsideOpen(!isAsideOpen);
  }, [isAsideOpen]);
  return {
    isAsideOpen,
    asideToggle,
  };
};

export const ProvideLayout = ({ children }: any) => {
  const filesTreeContext = useLayoutProvider();
  return (
    <LayoutContext.Provider value={filesTreeContext}>
      {children}
    </LayoutContext.Provider>
  );
};
