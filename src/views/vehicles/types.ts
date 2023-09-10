export const VehicleType = {
  "ON_ROAD_DUMP": "ON_ROAD_DUMP",
  "OFF_ROAD_DUMP": "OFF_ROAD_DUMP",
  "BULLDOZER": "BULLDOZER",
  "SHOVEL": "SHOVEL",
  "TANK_TRUCK": "TANK_TRUCK",
} as const

export type VehicleType = typeof VehicleType[keyof typeof VehicleType]

export type Response = {
  id: number;
  name: string;
  volume: number;
  type: VehicleType;
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

export const TabKey = {
  "tab1": "tab1",
  "tab2": "tab2",
  "tab3": "tab3",
  "tab4": "tab4",
} as const

export type TabKey = typeof TabKey[keyof typeof TabKey]
