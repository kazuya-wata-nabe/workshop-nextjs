import { ReactElement, useContext, useEffect, useLayoutEffect } from "react";
import { TabContext } from "./context";

type Props = {
  tabKey: string;
  title: string;
  children: ReactElement
};

const useIsomorphicEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export const TabItem = ({ title, tabKey, children }: Props) => {
  const { currentKey, addTab } = useContext(TabContext);

  useIsomorphicEffect(() => {
    addTab(title, tabKey);
  }, [addTab, tabKey, title]);

  return tabKey === currentKey ? <>{children}</> : null;
};