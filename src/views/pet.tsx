import { ENDPOINTS } from "@/repository/endpoints";
import { useEffect, useState } from "react";
import { data } from "./dummy-data";

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
const TabGroupByKind = {
  tab1: [""],
  tab2: ["cat"],
  tab3: ["dog"],
  tab4: ["fish"],
}

const URL = ENDPOINTS["ペット一覧"]
const translateResponse = (res: Response[]): ViewModel[] => {
  return res.map(r => {
    return {
      ...r,
      isCreated: false,
      isEdited: false,
    }
  })
}
/**
 * ペット一覧のビューコンポーネント
 */
const PetView = () => {
  // 編集モードか
  const [editMode, setEditMode] = useState(false)
  const changeEditMode = (isEdit: boolean) => {
    setEditMode(isEdit)
  }
  // 選択中のタブ
  // const [currentTab, setCurrentTab] = useState("tab1")
  // 車両プリセット
  // const [presetList, setPresetList] = useState()

  // ビューモデル一覧
  // const viewModels = useRef<ViewModel[]>([])
  // 編集ビューモデル一覧
  const [editedViewModels, setEditedViewModels] = useState<ViewModel[]>([])
  // 表示のフィルタ
  const [useOnly, setUseOnly] = useState()
  // モーダル
  // const [modal, setModal] = useState()


  // const nameComparator = (a: ViewModel, b: ViewModel) => {
  //   if (a.name == b.name) return 0;
  //   return a.name < b.name ? -1 : 1
  // }
  // /** */
  // const idComparator = (a: ViewModel, b: ViewModel) => {
  //   return a.id - b.id;
  // }
  // /**
  //  * ソートのコンパレータ 条件: 1. 種類, 2. 名前
  //  */
  // const comparator = (a: ViewModel, b: ViewModel) => {
  //   const firstCmpResult = nameComparator(a, b)
  //   return firstCmpResult !== 0 ? firstCmpResult : idComparator(a, b)
  // }

  // const translateVehicleList = (response: Response[]) => {
  //   const vehicles = response.map(res => {
  //     const vehicle: ViewModel = {
  //       id: res.id,
  //       name: res.name,
  //       volume: res.volume,
  //       type: res.type,
  //       color: res.color,
  //       totalWeight: res.totalWeight,
  //       maxLoadingWeight: res.maxLoadingWeight,
  //       maxLoadingVolume: res.maxLoadingVolume,
  //       dailyTransportPlanCount: res.dailyTransportPlanCount,
  //       isApproachAlert: res.isApproachAlert,
  //       approachAlertRadius: res.approachAlertRadius,
  //       isUse: res.isUse,
  //       isCreated: false, isEdited: false,
  //     }
  //     return vehicle;
  //   })
  //   const sortedList = vehicles.sort(comparator)
  //   return sortedList;
  // }
  // // モード切り替え
  // const onChangeEditMode = (isEdit: boolean, tab: string) => {
  //   const tabName = isEdit ? tab : ""
  //   if (!isEdit) {
  //     const originalList = structuredClone()
  //     // キャンセルボタンで編集リセット
  //     setEditedViewModels()
  //   }
  //   setEditTab(tabName)
  //   setEditMode(isEdit)
  // }
  // // 編集中のタブ以外を非活性にする
  // const isDisabledTab = (tab: string) => {
  //   if (editTab === "") {
  //     return false
  //   }
  //   if (editTab === tabName) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }
  // const onBlurName = () => {

  // }
  // const onChangeName = () => {

  // }
  // const onBlurWeight = (value: string) => {
  //   const target = items.fiter(item => item)[0]
  //   if (value === "") {

  //   } else {
  //     if (!hasError) {
  //       editTarget.totalWeight = true
  //       editTarget.hasError = false
  //       editTarget.isEdit = true
  //       isPresetClear()
  //     }
  //   }
  // }
  // // トグルオフで値をクリア
  // const onChangeApproachAlert = () => {

  // }


  // const mergeRecord = (items: Vehicle[]) => {
  //   const copiedVehicles = items.filter()
  //   if (copy.length > 0) {

  //   }
  // }

  // const selectPreset = () => {
  //   const preset = presetList.find()
  //   if (prest) {
  //     // 代入
  //   }
  // }

  // const onColorChange = () => {

  // }

  // const isWeightDisplayTarget = () => {
  //   if (false) {
  //     return false
  //   }
  //   return true
  // }

  // const isLoadingDisplayTarget = () => {
  //   if (false) {
  //     return false
  //   }
  //   return true
  // }


  // const crateTable = () => {
  //   const cols = []
  //   switch (tab) {
  //     // 表示するカラムをPush
  //   }
  // }


  // const onSave = () => {
  //   // request
  //   new Promise((resolve) => resolve(""))
  //     .then()
  //     .catch(e => {
  //       // 何かの処理
  //       throw e
  //     })
  // }

  // const onCreate = () => {
  //   // 新規レコードの作成
  // }

  // const convertParams = () => {
  //   // 新規
  // }
  // const convertParams = () => {
  //   // 編集
  // }
  // // 初期表示
  // useEffect(() => {
  //   axios.get<Response[]>(URL)
  //     .then(res => setEditedViewModels(res.data))
  //     .catch(e => { throw e })
  // }, [])

  const onSave = () => {
    console.log("save!")
    setEditMode(false)
  }

  useEffect(() => {
    setEditedViewModels(translateResponse(data))
  }, [])

  return (
    <main className="container">
      <div className="controls">
        <div className="toggle-use-only">
          {!editMode && <span><input type="checkbox" checked={useOnly} />利用のみ表示</span>}
          {editMode && <span style={{ marginLeft: "20px" }}>編集モード</span>}
        </div>
        <div>
          {!editMode && <button onClick={() => changeEditMode(true)}>編集</button>}
          {editMode && <button onClick={() => changeEditMode(false)}>キャンセル</button>}
          {editMode && <button onClick={() => onSave()}>保存</button>}
        </div>
      </div>
      <div>
        <div className="table">
          <ul>
            <li>名前</li>
            <li>種類</li>
          </ul>
          <hr/>
          {editedViewModels.map(item =>
            <ul key={item.id}>
              <li>{item.name}</li>
              <li>{item.type}</li>
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

export default PetView;
