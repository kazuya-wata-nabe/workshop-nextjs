import { ENDPOINTS } from "@/repository/endpoints";
import { useEffect, useMemo, useRef, useState } from "react";
import { adaptor } from "../_shared_/adaptor";
import { Tab } from "../_shared_/components/tab";
import { TabKey } from "../_shared_/components/tab/types";
import { RequestResult } from "../_shared_/types";
import { data } from "./dummy-data";
import { Table } from "./table";

type Type = "ToyPoodle" | "Chihuahua" | "Pug" | "Corgi" | "Bulldog" | "AkitaInu" | "Samoyed"
type Size = "micro" | "small" | "medium" | "large"

type Response = {
  id: number;
  name: string;
  volume: number;
  type: Type;
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

export type ViewModel = {
  id: number;
  name: string;
  volume: number;
  type: Type;
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
const GroupBySize = {
  micro: ["ToyPoodle", "Chihuahua"],
  small: ["Pug"],
  medium: ["Corgi", "Bulldog"],
  large: ["AkitaInu", "Samoyed"]
} satisfies Record<Size, Type[]>

const URL = ENDPOINTS["ペット一覧"]
/**
 * ペット一覧のビューコンポーネント
 */
const PetView = () => {
  // 編集モードか
  const [editMode, setEditMode] = useState(false)
  // 選択中のタブ
  const [currentTab, setCurrentTab] = useState("tab1")
  const original = useRef<ViewModel[]>([])
  // 車両プリセット
  // const [presetList, setPresetList] = useState()

  // ビューモデル一覧
  // const viewModels = useRef<ViewModel[]>([])
  // 編集ビューモデル一覧
  const [editedViewModels, setEditedViewModels] = useState<ViewModel[]>([])
  // 表示のフィルタ
  const [useOnly, setUseOnly] = useState(false)
  // モーダル
  // const [modal, setModal] = useState()
  const onChangeUseOnly = (value: boolean) => setUseOnly(value);

  const translateResponse = (res: Response[]): ViewModel[] => {
    return res.map(r => {
      return {
        id: r.id,
        name: r.name,
        volume: r.volume,
        type: r.type,
        color: r.color,
        totalWeight: r.totalWeight,
        maxLoadingVolume: r.maxLoadingVolume,
        maxLoadingWeight: r.maxLoadingWeight,
        dailyTransportPlanCount: r.dailyTransportPlanCount,
        isApproachAlert: r.isApproachAlert,
        approachAlertRadius: r.approachAlertRadius,
        isUse: r.isUse,
        isCreated: false,
        isEdited: false,
      }
    })
  }
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
    const firstCmpResult = nameComparator(a, b)
    return firstCmpResult !== 0 ? firstCmpResult : idComparator(a, b)
  }

  // モード切り替え
  const onChangeEditMode = (value: boolean) => {
    if (value) {
      const originalList = structuredClone(original.current)
      // キャンセルボタンで編集リセット
      setEditedViewModels(originalList)
    }
    setEditMode(value)
  }
  // 編集中のタブ以外を非活性にする
  const isDisabledTab = (tab: TabKey) => {
    if (!editMode) return false;
    if (currentTab === tab) {
      return false
    } else {
      return true
    }
  }
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
  // 新規レコードの作成
  const onClickCreate = (type: Type) => {
    const item: ViewModel = {
      id: 0,
      name: "",
      volume: 0,
      type,
      color: null,
      totalWeight: 0,
      maxLoadingVolume: 0,
      maxLoadingWeight: 0,
      dailyTransportPlanCount: 0,
      isApproachAlert: 0,
      approachAlertRadius: 0,
      isUse: true,
      isCreated: true, isEdited: false,
    }
    setEditedViewModels(prev => {
      const ids = prev.map(({ id }) => id)
      const maxId = ids.length > 0 ? Math.max(...ids) : 0
      return prev.concat({ ...item, id: maxId + 1 })
    })
  }

  const filterByType = useMemo(() => {
    const filtered = (size: Size) => editedViewModels.filter(item => GroupBySize[size].some(type => item.type === type))
    return {
      micro: filtered("micro"),
      small: filtered("small"),
      medium: filtered("medium"),
      large: filtered("large"),
    }
  }, [editedViewModels])

  // const convertParams = () => {
  //   // 新規
  // }
  // const convertParams = () => {
  //   // 編集
  // }

  const itemsWithUseOnly = useMemo(() => {
    return useOnly
      ? editedViewModels.filter(model => model.isUse)
      : editedViewModels
  }, [editedViewModels, useOnly])

  const onSave = () => {
    console.log("save!")
    adaptor.get<Response>(URL)
      .then(() => setEditMode(false))
      .catch((e: Extract<RequestResult, { result: "failure" }>) => {
        if (e.code === 400) {
          alert("保存失敗!!")
        }
        throw e;
      })
  }

  // 初期表示
  useEffect(() => {
    const viewModels = translateResponse(data)
    const sorted = viewModels.sort(comparator)
    original.current = [...sorted]
    setEditedViewModels([...sorted])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container">
      <div className="controls">
        <div className="toggle-use-only">
          {!editMode && currentTab === "tab1" && <span><input type="checkbox" checked={useOnly} onChange={({ target }) => onChangeUseOnly(target.checked)} />利用のみ表示</span>}
        </div>
        <div>
          {!editMode && currentTab === "tab1" && <p>編集は各タブへ</p>}
          {!editMode && currentTab !== "tab1" && <button onClick={() => onChangeEditMode(true)}>編集</button>}
          {editMode && <button onClick={() => onChangeEditMode(false)}>キャンセル</button>}
          {editMode && <button onClick={() => onSave()}>保存</button>}
        </div>
      </div>
      <div>
        <Tab<TabKey> defaultKey="tab1" isDisabled={isDisabledTab} onChange={setCurrentTab}>
          <Tab.Item<TabKey> title="全て" tabKey="tab1">
            <Table {...{ editMode: false, size: "all", items: itemsWithUseOnly }} />
          </Tab.Item>
          <Tab.Item<TabKey> title="超小型犬" tabKey="tab2">
            <Table {...{ editMode, size: "micro", items: filterByType.micro }} />
            {
              editMode &&
              <div>
                <button onClick={() => onClickCreate("ToyPoodle")}>追加</button>
                <button onClick={() => onClickCreate("Chihuahua")}>追加</button>
              </div>
            }
          </Tab.Item>
          <Tab.Item<TabKey> title="小型犬" tabKey="tab3">
            <Table {...{ editMode, items: filterByType.small }} />
            {
              editMode &&
              <div>
                <button onClick={() => onClickCreate("Pug")}>追加</button>
              </div>
            }
          </Tab.Item>
          <Tab.Item<TabKey> title="中型犬" tabKey="tab4">
            <Table {...{ editMode, items: filterByType.medium }} />
            {
              editMode &&
              <div>
                <button onClick={() => onClickCreate("Corgi")}>追加</button>
                <button onClick={() => onClickCreate("Bulldog")}>追加</button>
              </div>
            }
          </Tab.Item>
          <Tab.Item<TabKey> title="大型犬" tabKey="tab5">
            <Table {...{ editMode, items: filterByType.large }} />
            {
              editMode &&
              <div>
                <button onClick={() => onClickCreate("AkitaInu")}>追加</button>
                <button onClick={() => onClickCreate("Samoyed")}>追加</button>
              </div>
            }
          </Tab.Item>
        </Tab>
      </div>
    </main >
  )
}

export default PetView;
