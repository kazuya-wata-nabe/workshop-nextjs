import { RequestResult } from "./types";

const parse = async <T>(res: Response): Promise<RequestResult<T>> => {
  if (res.status < 400) {
    const json = await res.json() as T;
    return Promise.resolve({ result: "success", json });
  }
  return Promise.reject({ result: "failure", code: res.status });
}

const get = async <T>(url: string, query?: Record<string, string>) => {
  const params = query ? new URLSearchParams(query) : ""
  const path = params ? url.concat("?", params.toString()) : url;
  const res = await fetch(path, { method: "GET" })
  return parse<T>(res)
}

const post = async <T>(url: string, params?: Record<string, string>) => {
  const body = params ? JSON.stringify(params) : ""
  const res = await fetch(url, { method: "POST", body })
  return parse<T>(res)
}

export const adaptor = {
  get, post
} as const