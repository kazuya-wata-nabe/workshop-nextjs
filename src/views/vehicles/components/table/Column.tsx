import { VehicleType } from "../../_shared_/types";

type Props = {
  name: string;
  type: VehicleType;
}

export const Column = ({ name, type }: Props) => {
  return (
    <ul>
      <li className="col">{name}</li>
      <li className="col">{type}</li>
    </ul>
  )
}
