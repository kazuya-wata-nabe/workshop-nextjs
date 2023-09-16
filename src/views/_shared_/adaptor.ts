const BASE_URL = process.env.BASE_URL ?? "http://locahost:3000";

const parse = async <T>(res: Response): Promise<{ data: T }> => {
  if (res.status >= 400) {
    throw res;
  }
  const data = await res.json() as T;
  return { data };
}

const requet = (path: string, init: RequestInit) => {
  const prefix = path.startsWith("/") ? "" : "/";
  const url = BASE_URL.concat(prefix, path)
  return fetch(url, init)
}

const get = async <T>(url: string, query?: Record<string, string>) => {
  const params = query ? new URLSearchParams(query) : ""
  const path = params ? url.concat("?", params.toString()) : url;
  const res = await requet(path, { method: "GET" })
  return parse<T>(res)
}

const post = async <T>(url: string, params?: Record<string, string>) => {
  const body = params ? JSON.stringify(params) : ""
  const res = await requet(url, { method: "POST", body })
  return parse<T>(res)
}

const put = async <T>(url: string, params?: Record<string, string>) => {
  const body = params ? JSON.stringify(params) : ""
  const res = await requet(url, { method: "PUT", body })
  return parse<T>(res)
}


export const adaptor = {
  get, post, put
} as const
