import mockAxios from "axios";
import { Dispatch } from "redux";
import ApiClient from "../api-client";

describe("API Client", () => {
  const client = ApiClient({ collectionUrl: "http://www.example.com/articles" });

  describe("getEntity", () => {
    it("fetches data and returns correct data", async () => {
      // setup
      (mockAxios.get as jest.Mock).mockImplementationOnce(() => (
        Promise.resolve({
          data: {
            id: 1,
            title: "First article",
          },
          status: 200,
          statusText: "OK",
          // headers: {}
        })
      ));

      const dispatch: Dispatch = jest.fn((f: any) => f);

      const result = await client.getEntity("http://www.example.com/articles/1")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          url: "http://www.example.com/articles/1",
        },
        type: "@@rrf/FETCH_REQUEST",
      });
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          data: {
            id: 1,
            title: "First article",
          },
          status: 200,
          statusText: "OK",
        },
        type: "@@rrf/FETCH_SUCCESS",
      });
      expect(result).toEqual({
        id: 1,
        title: "First article",
      });
    });

    it("dispatches an error and returns an error", async () => {
      (mockAxios.get as jest.Mock).mockImplementationOnce(() => (
        Promise.reject("oh oh")
      ));

      const dispatch: Dispatch = jest.fn((f: any) => f);

      const result = await client.getEntity("http://example.com/articles/1")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          url: "http://example.com/articles/1",
        },
        type: "@@rrf/FETCH_REQUEST",
      });
      expect(dispatch).toHaveBeenCalledWith({
        payload: "oh oh",
        type: "@@rrf/FETCH_FAILURE",
      });
      expect(result).toEqual("oh oh");
    });
  });

  describe("getEntityList", () => {
    it("fetches data and returns correct data", async () => {
      // setup
      (mockAxios.get as jest.Mock).mockImplementationOnce(() => (
        Promise.resolve({
          data: [{
            id: 1,
            title: "First article",
          }],
          status: 200,
          statusText: "OK",
          // headers: {}
        })
      ));

      const dispatch: Dispatch = jest.fn((f: any) => f);

      const result = await client.getEntityList("http://example.com/articles")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          url: "http://example.com/articles",
        },
        type: "@@rrf/FETCH_REQUEST",
      });
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          data: [{
            id: 1,
            title: "First article",
          }],
          status: 200,
          statusText: "OK",
        },
        type: "@@rrf/FETCH_SUCCESS",
      });
      expect(result).toEqual([{
        id: 1,
        title: "First article",
      }]);
    });

    it("dispatches an error and returns an error", async () => {
      (mockAxios.get as jest.Mock).mockImplementationOnce(() => (
        Promise.reject("oh oh")
      ));

      const dispatch: Dispatch = jest.fn((f: any) => f);

      const result = await client.getEntityList("http://example.com/articles")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          url: "http://example.com/articles",
        },
        type: "@@rrf/FETCH_REQUEST",
      });
      expect(dispatch).toHaveBeenCalledWith({
        payload: "oh oh",
        type: "@@rrf/FETCH_FAILURE",
      });
      expect(result).toEqual("oh oh");
    });
  });
});
