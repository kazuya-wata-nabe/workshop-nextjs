import { ViewModel } from "./pet";

type Props = {
  items: ViewModel[];
}

export const Table = ({ items }: Props) => {
  return (
    <div className="table">
      <div className="header">
        <ul>
          <li>名前</li>
          <li>種類</li>
        </ul>
        <hr />
      </div>
      <div className="list-body">
        {items.map(item =>
          <ul key={item.id}>
            <li className="col">{item.name}</li>
            <li className="col">{item.type}</li>
          </ul>
        )}
      </div>
    </div>
  )
}
