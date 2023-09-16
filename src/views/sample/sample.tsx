import { useCallback, useEffect, useState } from "react";
import { adaptor } from "../_shared_/adaptor";
import { useTextController } from "./sample-hook";
import { SampleModel, SampleResponse } from "./sample-type";

// const getValue = (field: HTMLFormElement) => (key: string) => (field[key] as HTMLInputElement)?.value

export const SampleComponent = () => {
  const [models, setModels] = useState<SampleModel[]>([])
  const { text, handleChange } = useTextController()

  const convertToModels = useCallback((res: SampleResponse[]) => {
    const items = res.map(d => {
      const [year, month, day] = d.birthday.split("-")
      return {
        id: d.id,
        name: d.name,
        birthday: { year, month, day },
      }
    })
    items.sort((a, b) => a.name > b.name ? 1 : -1)
    return items;
  }, [])

  useEffect(() => {
    // ユーザ一覧取得
    adaptor.get<SampleResponse[]>("/users")
      .then(({ data }) => {
        const _models = convertToModels(data)
        setModels(_models)
      })
      .catch(err => alert(err))
  }, [convertToModels])

  return (
    <div>
      <h1>title</h1>
      <div>
        {models.map(model =>
          <div key={model.id}>
            <p>id: {model.id}, name: {model.name}</p>
            <label>input</label>
            <input value={text} name="name"
              onChange={({ target }) => handleChange(target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
