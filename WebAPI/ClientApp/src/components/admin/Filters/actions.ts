import { Dispatch } from "react"
import { FilterAction, AdminFiltersActionTypes, IFilterItem, IAdminFilter, FilterServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetAdminFilters = () => {
    return async (dispatch: Dispatch<FilterAction>) => {
        try {
            let response = await http.get<Array<IFilterItem>>('api/Filter/get-all')
            dispatch({
                type: AdminFiltersActionTypes.GET_ADMIN_FILTERS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetFilter = (id: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        try {
            let response = await http.get<IAdminFilter>(`api/Filter/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: AdminFiltersActionTypes.GET_ADMIN_FILTER_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const DeleteFilter = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/Filter/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const CreateFilter = (data: IAdminFilter) => {
    return async () => {

        try {
            await http.post(`api/Filter/create`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const UpdateFilter = (id: string, data: IAdminFilter) => {
    return async () => {

        try {
            await http.put(`api/Filter/edit/${id}`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}