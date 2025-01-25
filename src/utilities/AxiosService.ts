import axios from "axios";

const baseURL: string = process.env.REACT_APP_BASE_URL as string;

export const GET_METHOD = (actionName: string): Promise<any> => {
    return axios.get(baseURL + actionName);
}