import { createAction } from "./action-helpers";
import { ActionsUnion } from "./types";

export const FETCH_FAILURE = "@@rrf/FETCH_FAILURE";
export const FETCH_REQUEST = "@@rrf/FETCH_REQUEST";
export const FETCH_SUCCESS = "@@rrf/FETCH_SUCCESS";

export const Actions = {
  fetchFailure: (error: any) => createAction(FETCH_FAILURE, error),
  fetchRequest: (params?: object) => createAction(FETCH_REQUEST, params),
  fetchSuccess: (result: any) => createAction(FETCH_SUCCESS, result),
};

export type Actions = ActionsUnion<typeof Actions>;
