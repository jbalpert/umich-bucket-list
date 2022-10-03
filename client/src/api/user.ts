import axiosClient from ".";
import { IUser } from "../types";
const USER_URL = "/user";

export const userApi = {
    getUsers: () => axiosClient.get(USER_URL),
    postUser: (user: IUser) => axiosClient.post(USER_URL, user),
    getUserById: (id: string) => axiosClient.get(`${USER_URL}/${id}`),
    deleteUser: (id: string) => axiosClient.delete(`${USER_URL}/${id}`),
    updateUser: (id: string, user: any) => axiosClient.patch(`${USER_URL}/${id}`, user),
    getUsersByEventId: (eventid: string) => axiosClient.get(`${USER_URL}/byevent/${eventid}`),
};