import { components, paths } from "./schema";

export type ApiPath = keyof paths;
export type ApiResponse = components["schemas"]
