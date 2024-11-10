export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P];
};

export type Merge<T, P> = P & Omit<T, keyof P>;
