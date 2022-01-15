import { Dispatch } from "react"
import http from "../../http_comon"
import axios, { AxiosError } from "axios";
// import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
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
        try {
            let response = await http.post<IAuthResponse>('api/Account/logIn', data)
            const { token } = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<LoginServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post<IAuthResponse>('api/Account/signUp', data)
            const { token } = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<RegisterServerError>;
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

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
        localStorage.removeItem("token")
    }
}

export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    // const user = jwt.decode(token) as IUser;
    // jwt.verify(token)
    const user = jwt_decode(token) as IUser;
    dispatch({
        type: AuthActionTypes.AUTH_SUCCESS,
        payload: { id: user.id, name: user.name, surname: user.surname, photo: user.photo, email: user.email, roles: user.roles }
    })
}