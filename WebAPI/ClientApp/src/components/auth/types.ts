export enum AuthActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    GET_PROFILE = "GET_PROFILE"
}

export interface IUser {
    name: string,
    surname: string,
    image: string,
    email: string
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
    title: string,
    status: number,
    errors: Array<any>
}

export interface IRegisterModel {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    confirmpassword: string
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