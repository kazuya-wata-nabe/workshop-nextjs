import { useEffect, useState } from "react";
import { adaptor } from "../_shared_/adaptor";
import { convertToSortedModels } from "./converter";
import { useTextController } from "./sample-hook";
import { SampleModel, SampleResponse } from "./sample-type";

export const SampleComponent = () => {
  const { text, handleOnChange } = useTextController()
  const [models, setModels] = useState<SampleModel[]>([])

  useEffect(() => {
    // ユーザ一覧取得
    adaptor.get<SampleResponse[]>("/users")
      .then(({ data }) => {
        const _models = convertToSortedModels(data)
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
              onChange={({ target }) => handleOnChange(target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
