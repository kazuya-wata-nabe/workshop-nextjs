type Success<T> = {
  result: "success",
  data: T
}
type Failure<U> = {
  result: "failure"
  code: number;
  data: U;
}
export type RequestResult<T = unknown, U = unknown> = Success<T> | Failure<U>
