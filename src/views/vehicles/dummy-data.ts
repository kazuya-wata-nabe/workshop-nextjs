import { Response, VehicleType } from "./types"

const items: Omit<Response, "id">[] = [
  {
    name: "hoge",
    volume: 0,
    type: VehicleType.ON_ROAD_DUMP,
    color: "",
    totalWeight: 0,
    maxVolume: 0,
    maxLoadingVolume: 0,
    maxLoadingWeight: 0,
    dailyTransportPlanCount: 0,
    isApproachAlert: 0,
    approachAlertRadius: 0,
    isUse: true,
  },
  {
    name: "fugafugafugafuga",
    volume: 0,
    type: VehicleType.OFF_ROAD_DUMP,
    color: "",
    totalWeight: 0,
    maxVolume: 0,
    maxLoadingVolume: 0,
    maxLoadingWeight: 0,
    dailyTransportPlanCount: 0,
    isApproachAlert: 0,
    approachAlertRadius: 0,
    isUse: true,
  },
  {
    name: "piyopiyo",
    volume: 0,
    type: VehicleType.BULLDOZER,
    color: "",
    totalWeight: 0,
    maxVolume: 0,
    maxLoadingVolume: 0,
    maxLoadingWeight: 0,
    dailyTransportPlanCount: 0,
    isApproachAlert: 0,
    approachAlertRadius: 0,
    isUse: false,
  }
]

export const data: Response[] = items.map((item, i) => ({ ...item, id: i + 1 }))
