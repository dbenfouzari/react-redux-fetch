import * as fromActions from "./actions";

interface State {
  isFetching: boolean;
}

const reducer = (state: State, action: fromActions.Actions): State => {
  switch (action.type) {
    case fromActions.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case fromActions.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case fromActions.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};

export default reducer;
