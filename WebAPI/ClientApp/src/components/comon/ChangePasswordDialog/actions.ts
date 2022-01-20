import { ChangePasswordServerError, IChangePasswordModel } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const ChangePassword = (id: string, data: IChangePasswordModel) => {
    return async () => {
        try {
            await http.put(`api/Profile/change-password/${id}`, data)
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ChangePasswordServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    // serverError.response.data.errors = serverError.response.;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}