export const FETCH_REQUEST = "@@rrf/FETCH_REQUEST";
export const FETCH_SUCCESS = "@@rrf/FETCH_SUCCESS";
export const FETCH_FAILURE = "@@rrf/FETCH_FAILURE";

type FunctionType = (...args: any[]) => any;
interface ActionCreatorsMapObject { [actionCreator: string]: FunctionType; }
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
