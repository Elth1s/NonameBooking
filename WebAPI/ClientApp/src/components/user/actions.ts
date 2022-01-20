import { Dispatch } from "react"
import { IFilterGroup, ITypeOfApartment, SearchAction, SearchActionTypes } from "./types"
import http from "../../http_comon"
import axios, { AxiosError } from "axios"



export const GetFiltersForSearch = () => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            let response = await http.get<Array<IFilterGroup>>(`api/FilterGroup/get-all-with-filters`)
            dispatch({
                type: SearchActionTypes.GET_FILTERS_FOR_SEARCH,
                payload: response.data
            })

            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            // if (axios.isAxiosError(error)) {
            //     const serverError = error as AxiosError<LoginServerError>;
            //     if (serverError && serverError.response) {
            //         serverError.response.data.status = serverError.response.status;
            //         return Promise.reject(serverError.response.data);
            //     }
            // }
            return Promise.reject(error)
        }
    }
}

export const GetTypesOfApartmentForSearch = () => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            let response = await http.get<Array<ITypeOfApartment>>(`api/TypeOfApartment/get-all`)
            dispatch({
                type: SearchActionTypes.GET_TYPES_OF_APARTMENT_FOR_SEARCH,
                payload: response.data
            })

            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            // if (axios.isAxiosError(error)) {
            //     const serverError = error as AxiosError<LoginServerError>;
            //     if (serverError && serverError.response) {
            //         serverError.response.data.status = serverError.response.status;
            //         return Promise.reject(serverError.response.data);
            //     }
            // }
            return Promise.reject(error)
        }
    }
}