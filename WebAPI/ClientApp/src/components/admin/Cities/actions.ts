
import { Dispatch } from "react"
import { CityAction, AdminCitiesActionTypes, ICityItem, IAdminCity, CityServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetAdminCities = () => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            let response = await http.get<Array<ICityItem>>('api/City/get-all')
            dispatch({
                type: AdminCitiesActionTypes.GET_ADMIN_CITIES,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CityServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetAdminCity = (id: string) => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            let response = await http.get<IAdminCity>(`api/City/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: AdminCitiesActionTypes.GET_ADMIN_CITY_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CityServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const DeleteCity = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/City/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CityServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const CreateCity = (data: IAdminCity, image: File) => {
    return async () => {

        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("countryId", data.countryId.toString());
            formData.append("image", image);

            let response = await http.post('api/City/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CityServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const UpdateCity = (id: string, data: IAdminCity, image?: File) => {
    return async () => {

        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("countryId", data.countryId.toString());
            if (image)
                formData.append("image", image);

            let response = await http.put(`api/City/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<CityServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}