export enum ProfileActionTypes {
    GET_PROFILE = "GET_PROFILE",
}


export interface IProfile {
    name: string,
    surname: string,
    email: string,
    phone: string,
    photo: string,
}


export interface ProfileState {
    userInfo: IProfile
}

export interface ProfileServerError {
    title: string,
    status: number,
    errors: Array<any>,
}



export interface GetProfileAction {
    type: ProfileActionTypes.GET_PROFILE,
    payload: IProfile
}

export type ProfileAction = GetProfileAction;