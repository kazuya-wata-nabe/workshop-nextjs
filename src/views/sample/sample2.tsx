
import { useTextController } from "./sample-hook";
import { SampleResponse } from "./sample-type";

type Props = {
  response: SampleResponse;
}

const MAX_LENGTH = 50

export const SampleComponent = ({ response }: Props) => {
  const { text, handleOnChange } = useTextController()

  return (
    <div>
      <h1>title</h1>
      <p>id: {response.id}, name: {response.name}</p>
      <input value={text}
        maxLength={MAX_LENGTH}
        onChange={({ target }) => handleOnChange(target.value)}
      />
    </div>
  )
};


