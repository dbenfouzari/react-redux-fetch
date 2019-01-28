import {createAction} from "./action-helpers";
import * as fromActions from "./actions";
import reducers from "./reducers";

describe("reducers", () => {
  it("should work", () => {
    const state = { isFetching: false };
    const action = createAction(fromActions.FETCH_REQUEST);

    const result = reducers(state, action);
    const expectedResult = {
      isFetching: true,
    };

    expect(result).toEqual(expectedResult);
  });
});
