import { createContext } from "react";

type TabState<T extends string> = {
  currentKey: T;
  addTab: (title: string, key: T) => void;
};

export const TabContext = createContext<TabState<string>>({
  currentKey: "",
  addTab: () => null,
});
