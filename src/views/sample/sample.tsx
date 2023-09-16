import { FormEvent, useCallback, useEffect, useState } from "react";
import { adaptor } from "../_shared_/adaptor";
import { useTextController } from "./sample-hook";
import { SampleModel, SampleResponse } from "./sample-type";

const getValue = (field: HTMLFormElement) => (key: string) => (field[key] as HTMLInputElement)?.value

export const SampleComponent = () => {
  const [models, setModels] = useState<SampleModel[]>([])
  const { text, handleChange } = useTextController()
  
  const initializeModels =  useCallback((res: SampleResponse[]) => {
    const items = res.map(d => {
      const [year, month, day] = d.birthday.split("-")
      return {
        id: d.id,
        name: d.name,
        birthday: { year, month, day },
      }
    })
    items.sort((a, b) => a.name > b.name ? 1 : -1)
    setModels(items)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = getValue(event.currentTarget)
    // パラメータを作る処理
    const id = values("id");
    const body = {
      name: values("name"),
      birthday: [values("year"), values("month"), values("day")].join("-"),
    }
    adaptor.put(`/user/${id}`, body)
      .then(async () => {
        // リロード処理
        const { data } = await adaptor.get<SampleResponse[]>("/users");
        initializeModels(data)
      })
      .catch(err => {
        if (err instanceof Response && err.status >= 500) { throw err }
        alert(err)
      })
  }

  useEffect(() => {
    // ユーザ一覧取得
    adaptor.get<SampleResponse[]>("/users")
      .then(({ data }) => initializeModels(data))
      .catch(err => alert(err))
  }, [initializeModels])

  return (
    <div>
      <h1>title</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">保存</button>
          {models.map(model =>
            <div key={model.id}>
              <p>id: {model.id}, name: {model.name}</p>
              <label>input</label>
              <input value={text} name="name"
                onChange={({ target }) => handleChange(target.value)}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
