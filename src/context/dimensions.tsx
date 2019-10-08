import React, { createContext, useState, useEffect } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export interface DI {
  dimensions: Dimensions;
}

const getWindowDimensions = (): Dimensions => ({ width: window.innerWidth, height: window.innerHeight });

const DimensionsContext = createContext<DI>({ dimensions: getWindowDimensions() });

interface Props {
  children: JSX.Element;
}

const DimensionsProvider = ({ children }: Props): JSX.Element => {
  const [dimensions, setDimensions] = useState<Dimensions>(getWindowDimensions());

  useEffect((): (() => void) => {
    const handleResize = (): void => {
      setDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return <DimensionsContext.Provider value={{ dimensions }}>{children}</DimensionsContext.Provider>;
};

export { DimensionsProvider, DimensionsContext };
