import { ENDPOINTS } from "@/repository/endpoints";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


type Response = {
  id: number;
  name: string;
  volume: number;
  maxVolume: number;
  maxWeight: number;
  isApproachAlert: number;
  approachAlertValue: number;
  isUse: boolean;
  // 新規レコードかどうか
  isCreate: boolean;
  // 既存レコードで編集されたかどうか
  isEdit: boolean;

  isNameError: boolean;
  isVolumeError: boolean;
  isMaxVolumeError: boolean;
  isMaxWeightVolumeError: boolean;
}

type ViewModel = {
  id: number;
  name: string;
  volume: number;
  maxVolume: number;
  maxWeight: number;
  isApproachAlert: number;
  approachAlertValue: number;
  isUse: boolean;
  // 新規レコードかどうか
  isCreate: boolean;
  // 既存レコードで編集されたかどうか
  isEdit: boolean;
  // エラー
  isNameError: boolean;
  isVolumeError: boolean;
  isMaxVolumeError: boolean;
  isMaxWeightVolumeError: boolean;
}

const URL = ENDPOINTS["ペット一覧"]
/**
 * ペット一覧のビューコンポーネント
 */
const PetView = () => {
  // 編集モードか
  const [editMode, setEditMode] = useState()
  // 選択中のタブ
  const [currentTab, setCurrentTab] = useState()

  // ビューモデル一覧
  const viewModels = useRef<ViewModel[]>([])
  // 編集ビューモデル一覧
  const [editedViewModels, setEditedViewModels] = useState<ViewModel[]>([])

  const nameComparator = (a: ViewModel, b: ViewModel) => {
    if (a.name == b.name) return 0;
    return a.name < b.name ? -1 : 1
  }
  /** */
  const idComparator = (a: ViewModel, b: ViewModel) => {
    return a.id - b.id;
  }
  /**
   * ソートのコンパレータ 条件: 1. 種類, 2. 名前
   */
  const comparator = (a: ViewModel, b: ViewModel) => {
    const firstCmpResult = nameComparator(a, b) === 0
    return firstCmpResult ? firstCmpResult : idComparator(a, b)
  }

  const translateVehicleList = (response: Response[]) => {
    const vehicles = response.map(res => {
      const vehicle: ViewModel = {
        id: res.id,
        name: res.name,
        type: res.type,
        color: res.color,
        totalWeight: res.totalWeight,
        maxLoadingWeight: res.maxLoadingWeight,
        maxLoadinVolume: res.maxLoadinVolume,
        dailyTransportPlanCount: res.dailyTransportPlanCount,
        isApproachAlert: res.isApproachAlert,
        approashClertRadius: res.approashClertRadius,
        isStartingLine: res.isStartingLine,
      }
      return vehicle;
    })
    const sortedList = vehicles.sort(comparator)
    return sortedList;
  }

  const handler = () => {

  }

  useEffect(() => {
    axios.get<Response[]>(URL)
      .then(res => setEditedViewModels(res.data))
      .catch(e => { throw e })
  }, [])

  const onSave = () => {
    axios.get<Response[]>(URL)
      .then(res => setEditedViewModels(res.data))
      .catch(e => { throw e })
  }

  return (
    <main>
      <button onClick={onSave}>保存</button>
      <div>
        {editedViewModels.map(item =>
          <p key={item.id}>{item.name}</p>
        )}
      </div>
    </main>
  )
}

export default PetView;
