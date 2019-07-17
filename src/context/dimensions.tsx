import React, { ComponentType, createContext, useState, useEffect } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): Dimensions => ({ width: window.innerWidth, height: window.innerHeight });

const { Provider, Consumer } = createContext(getWindowDimensions());

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

  return <Provider value={{ dimensions }}>{children}</Provider>;
};

export interface DI {
  dimensions: Dimensions;
}

const withDimensions = <T extends {}>(Cmp: ComponentType<T>): ((props: T & DI) => JSX.Element) => (
  props: T & DI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { DimensionsProvider, withDimensions };
