import React, { createContext, useContext, useState, ReactNode } from "react";

interface MedalCount {
  Gold: number;
  Silver: number;
  Bronze: number;
}

type MedalData = Record<
  string,
  Record<
    string,
    Record<
      string,
      Record<
        string,
        Record<string, MedalCount>
      >
    >
  >
>;

interface MedalDataContextType {
  medalData: MedalData;
  setMedalData: React.Dispatch<React.SetStateAction<MedalData>>;
}

const MedalDataContext = createContext<MedalDataContextType | undefined>(undefined);

export const MedalDataProvider = ({ children }: { children: ReactNode }) => {
  const [medalData, setMedalData] = useState<MedalData>({});

  return (
    <MedalDataContext.Provider value={{ medalData, setMedalData }}>
      {children}
    </MedalDataContext.Provider>
  );
};

export const useMedalData = (): MedalDataContextType => {
  const context = useContext(MedalDataContext);
  if (!context) {
    throw new Error("useMedalData must be used within a MedalDataProvider");
  }
  return context;
};
