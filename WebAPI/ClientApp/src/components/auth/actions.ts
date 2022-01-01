import { Dispatch } from "react"
import http from "../../http_comon"
import axios, { AxiosError } from "axios";
// import jwt from "jsonwebtoken";
import {
    IUser,
    AuthAction,
    ILoginModel,
    IAuthResponse,
    IRegisterModel,
    AuthActionTypes,
    LoginServerError,
    RegisterServerError
} from "./types";


export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        await http.post<IAuthResponse>('api/Account/logIn', data)
            .then(response => {
                const { token } = response.data;
                localStorage.token = token;
                // AuthUser(access_token, dispatch);
                return Promise.resolve();
            }).catch(error => {
                // dispatch({ type: AuthActionTypes.LOGIN_AUTH_ERROR, payload: "Error" })
                if (axios.isAxiosError(error)) {
                    const serverError = error as AxiosError<LoginServerError>;
                    if (serverError && serverError.response) {
                        serverError.response.data.status = serverError.response.status;
                        serverError.response.data.error = serverError.response.statusText
                        return Promise.reject(serverError.response.data);
                    }
                }
                return Promise.reject(error.response.status)
            });
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post<IAuthResponse>('api/Account/signUp', data)
            const { token } = response.data;
            localStorage.token = token;
            // AuthUser(access_token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                console.log(error)
                const serverError = error as AxiosError<RegisterServerError>;
                console.log(serverError.code);
                console.log(serverError.response?.statusText);
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    // serverError.response.data.errors = serverError.response.;
                    console.log(serverError)
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}

// export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
//     const user = jwt.decode(token) as IUser;
//     dispatch({
//         type: AuthActionTypes.AUTH_SUCCESS,
//         payload: { name: user.name, surname: user.surname, image: user.image }
//     })
// }