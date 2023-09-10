import { data } from "./dummy-data"

export const dummyAdapter = {
  get: <T>() => Promise.resolve({ data } as { data: T }),
}