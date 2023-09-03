type PetType = "cat" | "dog" | "fish"

export type Response = {
  id: number;
  name: string;
  volume: number;
  type: PetType;
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
