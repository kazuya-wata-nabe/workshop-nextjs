export type TypeAlias<T> = T extends string ? T : never;

export const tabKeys = {
  "tab1": "tab1",
  "tab2": "tab2"
} as const

export type TabKey = typeof tabKeys[keyof typeof tabKeys]