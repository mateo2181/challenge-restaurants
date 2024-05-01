import { AxiosError } from "axios";
import { client } from "@/api/client";
import { ApiError, ApiResponse } from "@/types/api";
import { NewUserCredentials, UserCredentials, UserLogged } from "@/types/user";

const apiLogin = (credentials: UserCredentials): Promise<ApiResponse<UserLogged> | Error> => {
    return client.post<UserCredentials, ApiResponse<UserLogged>>(
        '/auth/login',
        { ...credentials },
        { headers: { "Content-Type": 'application/x-www-form-urlencoded' } })
        .then(res => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw new Error((err.response?.data as ApiError).message)
        });
}

const apiSignup = (credentials: NewUserCredentials): Promise<string | Error> => {
    return client.post<NewUserCredentials, ApiResponse<string>>('/auth/signup', { ...credentials })
        .then(res => {
            return res.data;
        })
        .catch((err: AxiosError) => {
            throw new Error((err.response?.data as ApiError).message)
        });
}

export {
    apiLogin,
    apiSignup
}