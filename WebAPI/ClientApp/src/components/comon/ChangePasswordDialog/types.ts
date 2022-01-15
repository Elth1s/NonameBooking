
export interface IChangePasswordModel {
    oldPassword: string,
    password: string,
    confirmPassword: string,
}

export interface ChangePasswordServerError {
    title: string,
    status: number,
    errors: Array<any>,
}
