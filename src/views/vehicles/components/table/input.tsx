import { VehicleType } from "../../_shared_/types";

type Props = {
  name: string;
  type: VehicleType;
}

export const Input = ({ name, type }: Props) => {
  return (
    <ul>
      <input value={name} />
      <input value={type} readOnly />
    </ul>
  )
}
