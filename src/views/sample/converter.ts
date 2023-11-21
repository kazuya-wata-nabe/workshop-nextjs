import { SampleModel, SampleResponse } from "./sample-type"

const comp = (a: SampleModel, b: SampleModel) => a.birthday.getTime() - b.birthday.getTime()
export const convertToSortedModels = (data: SampleResponse[]) => {
  const items = data.map(d => {
    return {
      id: d.id,
      name: d.name,
      birthday: new Date(d.birthday),
    }
  })
  return [...items].sort(comp)
}