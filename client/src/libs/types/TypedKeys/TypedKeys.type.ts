export type TypedKeys<T, F> = {
  [K in keyof T]: T[K] extends F ? K : never;
}[keyof T];
