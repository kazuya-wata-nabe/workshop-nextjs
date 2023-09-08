import clsx from "clsx";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { TabContext } from "./context";
import { TabItem } from "./item";

type Props<T extends string> = {
  defaultKey: T;
  children: ReactElement[]
};

type TabItem<T extends string> = {
  title: string;
  key: T;
};

const update = <T extends string>(items: TabItem<T>[], { title, key }: TabItem<T>) => {
  const index = items.findIndex(item => item.key === key)
  return index > -1 ? items : [...items, { title, key }]
}

export const Tab = <T extends string>({ defaultKey, children }: Props<T>) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);
  const [tabs, setTabs] = useState<TabItem<T>[]>([]);

  const addTab = useCallback((title: string, key: string) => {
    setTabs(prev => update(prev, { title, key } as TabItem<T>))
  }, [])

  const value = useMemo(() => {
    return {
      currentKey,
      addTab,
    };
  }, [addTab, currentKey])

  return (
    <TabContext.Provider value={value}>
      <div className="tab-wrap">
        {tabs.map(({ title, key }) => (
          <div
            key={key}
            className={clsx("tab", key === currentKey && "active")}
            onClick={() => setCurrentKey(key)}
          >
            <label>
              <input type="radio" name="tab" />
              {title}
            </label>
          </div>
        ))}
      </div>
      {children}
    </TabContext.Provider>
  );
};

Tab.Item = TabItem