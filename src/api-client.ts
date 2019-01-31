import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { Actions } from "./actions";

type EntityId = string | number;

interface ApiClientParams {
  collectionUrl: string;
  entitySchema?: any;
}

const ApiClient = ({ collectionUrl, entitySchema }: ApiClientParams) => ({
  getEntity: (entityId: EntityId) => async (dispatch: Dispatch): Promise<AxiosResponse> => {
    dispatch(Actions.fetchRequest({ url: entityId }));

    try {
      const response = await axios.get(String(entityId));
      dispatch(Actions.fetchSuccess(response));
      return response.data;
    } catch (e) {
      dispatch(Actions.fetchFailure(e));
      return e;
    }
  },

  getEntityList: (entityUrl: string) => async (dispatch: Dispatch): Promise<AxiosResponse> => {
    dispatch(Actions.fetchRequest({ url: entityUrl }));

    try {
      const response = await axios.get(entityUrl);
      dispatch(Actions.fetchSuccess(response));
      return response.data;
    } catch (e) {
      dispatch(Actions.fetchFailure(e));
      return e;
    }
  },
});

export default ApiClient;
