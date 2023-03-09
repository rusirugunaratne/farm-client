import axios from "axios";

export const BASE_URL = "https://localhost:7244/";

export const ENDPOINTS = {
  farm: "Farm",
  fileUpload: "FileUpload/UploadFiles",
  worker: "Worker",
};

export const createAPIEndpoint = (endpoint: any) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id: number) => axios.get(url + id),
    post: (newRecord: any) => axios.post(url, newRecord),
    put: (id: number, updatedRecord: any) => axios.put(url + id, updatedRecord),
    delete: (id: number) => axios.delete(url + id),
  };
};
