import axios, { AxiosResponse } from "axios";
import { normalize, schema } from "normalizr";
import { Dispatch } from "redux";
import { Actions } from "./actions";

type EntityId = string | number;

interface ApiClientParams {
  collectionUrl: string;
  entitySchema: schema.Entity;
}

const ApiClient = ({ collectionUrl, entitySchema }: ApiClientParams) => ({
  getEntity: (entityId: EntityId) => async (dispatch: Dispatch): Promise<AxiosResponse> => {
    dispatch(Actions.fetchRequest({ url: entityId }));

    try {
      const response = await axios.get(String(entityId));

      const normalizedData = normalize(response.data, entitySchema);
      const result = {
        ...response,
        data: normalizedData,
      };

      dispatch(Actions.fetchSuccess(result));
      return result.data.entities[entitySchema.key];
    } catch (e) {
      dispatch(Actions.fetchFailure(e));
      return e;
    }
  },

  getEntityList: (entityUrl: string) => async (dispatch: Dispatch): Promise<AxiosResponse> => {
    dispatch(Actions.fetchRequest({ url: entityUrl }));

    try {
      const response = await axios.get(entityUrl);

      const normalizedData = normalize(response.data, [entitySchema]);
      const result = {
        ...response,
        data: normalizedData,
      };

      dispatch(Actions.fetchSuccess(result));
      return result.data.entities[entitySchema.key];
    } catch (e) {
      dispatch(Actions.fetchFailure(e));
      return e;
    }
  },
});

export default ApiClient;
