import {createAction} from "../action-helpers";
import * as fromActions from "../actions";
import reducers from "../reducers";

describe("reducers", () => {
  it("should work with fetch request", () => {
    const state = { isFetching: false };
    const action = createAction(fromActions.FETCH_REQUEST);

    const result = reducers(state, action);
    const expectedResult = {
      isFetching: true,
    };

    expect(result).toEqual(expectedResult);
  });

  it("should work with fetch success", () => {
    const state = { isFetching: false };
    const action = createAction(fromActions.FETCH_SUCCESS);

    const result = reducers(state, action);
    const expectedResult = {
      isFetching: false,
    };

    expect(result).toEqual(expectedResult);
  });

  it("should work with fetch failure", () => {
    const state = { isFetching: false };
    const action = createAction(fromActions.FETCH_FAILURE);

    const result = reducers(state, action);
    const expectedResult = {
      isFetching: false,
    };

    expect(result).toEqual(expectedResult);
  });

  it("should work with unknown", () => {
    const state = { isFetching: false };
    const action = createAction("zkja");

    const result = reducers(state, action as any);
    const expectedResult = {
      isFetching: false,
    };

    expect(result).toEqual(expectedResult);
  });
});
