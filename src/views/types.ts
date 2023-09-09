type Type = "ToyPoodle" | "Chihuahua" | "Pug" | "Corgi" | "Bulldog" | "AkitaInu" | "Samoyed"

export type Response = {
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
