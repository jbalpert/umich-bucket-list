import axiosClient from ".";
const USER_URL = "/user";

export const userApi = {
    getUsers: () => axiosClient.get(USER_URL),
    getUserById: (id: string) => axiosClient.get(`${USER_URL}/${id}`),
    getUsersByEventId: (eventid: string) => axiosClient.get(`${USER_URL}/byevent/${eventid}`),
    updateUser: (id: string, user: any) => axiosClient.patch(`${USER_URL}/${id}`, user),
    // postUser: (user: IUser) => axiosClient.post(USER_URL, user),
    // deleteUser: (id: string) => axiosClient.delete(`${USER_URL}/${id}`),
};