import { createContext } from "react";

type TabState = {
  currentKey: string;
  addTab: (title: string, key: string) => void;
};

export const TabContext = createContext<TabState>({
  currentKey: "",
  addTab: () => null,
});
