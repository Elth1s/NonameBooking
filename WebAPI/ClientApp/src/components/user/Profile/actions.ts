import axios, { AxiosError } from "axios"
import { Dispatch } from "react"
import http from "../../../http_comon"
import { AuthUser } from "../../auth/actions"
import { AuthAction } from "../../auth/types"
import { IProfile, ProfileAction, ProfileActionTypes, ProfileServerError } from "./types"

export const GetProfile = (id: string) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            let response = await http.get<IProfile>(`api/Profile/get-profile/${id}`)
            dispatch({
                type: ProfileActionTypes.GET_PROFILE,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProfileServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}

export const UpdateProfile = (id: string, data: IProfile, image?: File) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("surname", data.surname);
            formData.append("phone", data.phone);
            if (image)
                formData.append("photo", image);
            let response = await http.put(`api/Profile/edit-profile/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const { token } = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ProfileServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}