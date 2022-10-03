import axiosClient from ".";
import { ILoginResponse } from "../types";
const AUTH_URL = "/auth";

export const authApi = {
    google: (code: string): Promise<ILoginResponse> => axiosClient.post(`${AUTH_URL}/google`, { code }),
    googleRefresh: (code: string) => axiosClient.post(`${AUTH_URL}/google/refresh`, { code }),
};