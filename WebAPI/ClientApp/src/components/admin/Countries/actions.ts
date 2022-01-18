import { Dispatch } from "react"
import { CountryAction, CountriesActionTypes, IAdminCountry, CountryServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const CreateCountry = (data: IAdminCountry) => {
    return async () => {

        try {
            await http.post('api/Country/create', data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CountryServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const DeleteCountry = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/Country/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CountryServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetCountry = (id: string | null) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            let response = await http.get<IAdminCountry>(`api/Country/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: CountriesActionTypes.GET_COUNTRY_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CountryServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const UpdateCountry = (id: string, data: IAdminCountry) => {
    return async () => {
        try {
            await http.put(`api/Country/edit/${id}`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CountryServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}