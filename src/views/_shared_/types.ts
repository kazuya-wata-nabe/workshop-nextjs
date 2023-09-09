type Success<T> = {
  result: "success",
  json: T
}
type Failure<U> = {
  result: "failure"
  code: number;
  json: U;
}
export type RequestResult<T = unknown, U = unknown> = Success<T> | Failure<U>
