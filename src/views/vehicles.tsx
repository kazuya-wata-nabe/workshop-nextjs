import { ENDPOINTS } from "@/repository/endpoints";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type AnimalType = "cat" | "dog" | "fish"

type Response = {
  id: number;
  name: string;
  volume: number;
  type: AnimalType;
  color: string | null;
  totalWeight: number;
  maxVolume: number;
  maxLoadingVolume: number;
  maxLoadingWeight: number;
  dailyTransportPlanCount: number;
  isApproachAlert: number;
  approachAlertRadius: number;
  isUse: boolean;
}

type ViewModel = {
  id: number;
  name: string;
  volume: number;
  type: AnimalType;
  color: string | null;
  totalWeight: number;
  maxLoadingVolume: number;
  maxLoadingWeight: number;
  dailyTransportPlanCount: number;
  isApproachAlert: number;
  approachAlertRadius: number;
  isUse: boolean;
  // 新規レコードかどうか
  isCreated: boolean;
  // 既存レコードで編集されたかどうか
  isEdited: boolean;
  // エラー
  isNameError?: boolean;
  isVolumeError?: boolean;
  isMaxVolumeError?: boolean;
  isMaxWeightVolumeError?: boolean;
}
// タブに表示する車両種類の定義

const VEHICLE_TYPE_TAB_CORRESPONDING = {
  tab1: [],
  tab2: ["cat"],
  tab3: ["dog"],
}

const URL = ENDPOINTS["ペット一覧"]
/**
 * ペット一覧のビューコンポーネント
 */
const PetView = () => {
  // 編集モードか
  const [editMode, setEditMode] = useState(false)
  // 選択中のタブ
  const [currentTab, setCurrentTab] = useState("tab1")
  // 車両プリセット
  const [presetList, setPresetList] = useState()

  // ビューモデル一覧
  const viewModels = useRef<ViewModel[]>([])
  // 編集ビューモデル一覧
  const [editedViewModels, setEditedViewModels] = useState<ViewModel[]>([])
  // 表示のフィルタ
  const [useOnly, setUseOnly] = useState()
  // モーダル
  const [modal, setModal] = useState()


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
        volume: res.volume,
        type: res.type,
        color: res.color,
        totalWeight: res.totalWeight,
        maxLoadingWeight: res.maxLoadingWeight,
        maxLoadingVolume: res.maxLoadingVolume,
        dailyTransportPlanCount: res.dailyTransportPlanCount,
        isApproachAlert: res.isApproachAlert,
        approachAlertRadius: res.approachAlertRadius,
        isUse: res.isUse,
        isCreated: false, isEdited: false,
      }
      return vehicle;
    })
    const sortedList = vehicles.sort(comparator)
    return sortedList;
  }
  // モード切り替え
  const onChangeEditMode = (isEdit: boolean, tab: string) => {
    const tabName = isEdit ? tab : ""
    if (!isEdit) {
      const originalList = structuredClone()
      // キャンセルボタンで編集リセット
      setEditedViewModels()
    }
    setEditTab(tabName)
    setEditMode(isEdit)
  }
  // 編集中のタブ以外を非活性にする
  const isDisabledTab = (tab: string) => {
    if (editTab === "") {
      return false
    }
    if (editTab === tabName) {
      return false
    } else {
      return true
    }
  }
  const onBlurName = () => {

  }
  const onChangeName = () => {

  }
  const onBlurWeight = (value: string) => {
    const target = items.fiter(item => item)[0]
    if (value === "") {

    } else {
      if (!hasError) {
        editTarget.totalWeight = true
        editTarget.hasError = false
        editTarget.isEdit = true
        isPresetClear()
      }
    }
  }
  // トグルオフで値をクリア
  const onChangeApproachAlert = () => {

  }


  const mergeRecord = (items: Vehicle[]) => {
    const copiedVehicles = items.filter()
    if (copy.length > 0) {

    }
  }

  const selectPreset = () => {
    const preset = presetList.find()
    if (prest) {
      // 代入
    }
  }

  const onColorChange = () => {

  }

  const isWeightDisplayTarget = () => {
    if (false) {
      return false
    }
    return true
  }

  const isLoadingDisplayTarget = () => {
    if (false) {
      return false
    }
    return true
  }


  const crateTable = () => {
    const cols = []
    switch (tab) {
      // 表示するカラムをPush
    }
  }


  const onSave = () => {
    // request
    .then()
    .catch(e => {

      throw e
    })
  }

  const onCreate = () => {
    // 新規レコードの作成
  }

  const convertParams = () => {
    // 新規
  }
  const convertParams = () => {
    // 編集
  }
  // 初期表示
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
