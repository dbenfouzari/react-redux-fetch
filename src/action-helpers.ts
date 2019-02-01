/**
 * @see https://github.com/redux-utilities/flux-standard-action
 */
export interface Action<T extends string> {
  error?: boolean;
  meta?: any;
  payload?: any;
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

// export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload?: P,
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload: P) {
  return payload === undefined ? { type } : { type, payload };
}
