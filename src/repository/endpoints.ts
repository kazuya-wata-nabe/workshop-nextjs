import { ApiPath } from "@/openapi/schema-util";

export const ENDPOINTS: Record<string, ApiPath> = {
  "ペット一覧取得": "/pet",
} as const