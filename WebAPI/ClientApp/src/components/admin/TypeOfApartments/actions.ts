import { Dispatch } from "react"
import { TypeOfApartmentAction, AdminTypeOfApartmentsActionTypes, ITypeOfApartmentItem, IAdminTypeOfApartment, TypeOfApartmentServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetAdminTypeOfApartments = () => {
    return async (dispatch: Dispatch<TypeOfApartmentAction>) => {
        try {
            let response = await http.get<Array<ITypeOfApartmentItem>>('api/TypeOfApartment/get-all')
            dispatch({
                type: AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENTS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<TypeOfApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetAdminTypeOfApartment = (id: string) => {
    return async (dispatch: Dispatch<TypeOfApartmentAction>) => {
        try {
            let response = await http.get<IAdminTypeOfApartment>(`api/TypeOfApartment/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENT_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<TypeOfApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const DeleteTypeOfApartment = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/TypeOfApartment/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<TypeOfApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const CreateTypeOfApartment = (data: IAdminTypeOfApartment) => {
    return async () => {

        try {
            await http.post(`api/TypeOfApartment/create`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<TypeOfApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const UpdateTypeOfApartment = (id: string, data: IAdminTypeOfApartment) => {
    return async () => {

        try {
            await http.put(`api/TypeOfApartment/edit/${id}`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<TypeOfApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}