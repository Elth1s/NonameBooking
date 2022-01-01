export enum AuthActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    GET_PROFILE = "GET_PROFILE"
}

export interface IUser {
    name: string,
    surname: string,
    image: string
}

export interface IAuthResponse {
    token: string,
}

export interface AuthState {
    user: IUser,
    isAuth: boolean,
}

export interface ILoginModel {
    email: string,
    password: string,
}

export interface LoginServerError {
    status: number,
    email: Array<string>,
    password: Array<string>,
    error: string
}

export interface IRegisterModel {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
};

export interface RegisterServerError {
    title: string,
    status: number,
    errors: Array<any>,
}


export interface AuthSuccessAction {
    type: AuthActionTypes.AUTH_SUCCESS,
    payload: IUser
}

export interface GetProfileAction {
    type: AuthActionTypes.GET_PROFILE,
    payload: IUser
}

export type AuthAction = AuthSuccessAction;
export type ProfileAction = GetProfileAction;