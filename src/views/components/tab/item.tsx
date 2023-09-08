import { ReactElement, useContext, useEffect, useLayoutEffect } from "react";
import { TabContext } from "./context";

type Props<T extends string> = {
  tabKey: T;
  title: string;
  children: ReactElement
};

const useIsomorphicEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export const TabItem = <T extends string>({ title, tabKey, children }: Props<T>) => {
  const { currentKey, addTab } = useContext(TabContext);

  useIsomorphicEffect(() => {
    addTab(title, tabKey);
  }, [addTab, tabKey, title]);

  return tabKey === currentKey ? <>{children}</> : null;
};