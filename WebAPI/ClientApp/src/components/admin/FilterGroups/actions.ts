import { Dispatch } from "react"
import { FilterGroupAction, AdminFilterGroupsActionTypes, IFilterGroupItem, IAdminFilterGroup, FilterGroupServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetAdminFilterGroups = () => {
    return async (dispatch: Dispatch<FilterGroupAction>) => {
        try {
            let response = await http.get<Array<IFilterGroupItem>>('api/FilterGroup/get-all')
            dispatch({
                type: AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUPS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterGroupServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetAdminFilterGroup = (id: string) => {
    return async (dispatch: Dispatch<FilterGroupAction>) => {
        try {
            let response = await http.get<IAdminFilterGroup>(`api/FilterGroup/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUP_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterGroupServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const DeleteFilterGroup = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/FilterGroup/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterGroupServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const CreateFilterGroup = (data: IAdminFilterGroup) => {
    return async () => {

        try {
            await http.post(`api/FilterGroup/create`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterGroupServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const UpdateFilterGroup = (id: string, data: IAdminFilterGroup) => {
    return async () => {

        try {
            await http.put(`api/FilterGroup/edit/${id}`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<FilterGroupServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}