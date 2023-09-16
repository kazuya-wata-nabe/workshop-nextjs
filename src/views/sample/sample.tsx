import { useEffect, useState } from "react";
import { adaptor } from "../_shared_/adaptor";
import { useTextController } from "./sample-hook";
import { SampleModel, SampleResponse } from "./sample-type";

// const getValue = (field: HTMLFormElement) => (key: string) => (field[key] as HTMLInputElement)?.value

export const SampleComponent = () => {
  const [models, setModels] = useState<SampleModel[]>([])
  const { text, handleChange } = useTextController()

  useEffect(() => {
    // ユーザ一覧取得
    adaptor.get<SampleResponse[]>("/users")
      .then(({ data }) => {
        const _models = data.map(d => {
          const [year, month, day] = d.birthday.split("-")
          return {
            id: d.id,
            name: d.name,
            birthday: { year, month, day },
          }
        })
        _models.sort((a, b) => a.name > b.name ? 1 : -1)
        setModels(_models)
      })
      .catch(err => alert(err))
  }, [])

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
