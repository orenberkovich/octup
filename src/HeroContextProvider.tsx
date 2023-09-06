import { createContext, useState } from "react";

export type HeroContextType = {
  data: DataProps[] | null;
  setData: (data: any) => void;
};

export const HeroContext = createContext<HeroContextType | null>(null);

interface Imageobject {
    url: string;
  }
  

export interface DataProps {
  id: number;
  name: string;
  powerstats: object;
  biography: object;
  appearance: object;
  work: object;
  connections: object;
  image: Imageobject;
  parent?: string;
  props:DataProps;
  info:DataProps[];
}

interface HeroContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const HeroContextProvider = ({
  children,
}: HeroContextProviderProps) => {
  const [data, setData] = useState<DataProps[] | null>([]);

  return (
    <HeroContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};
