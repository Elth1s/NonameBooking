import { Dispatch } from "react"
import { HomeAction, HomeActionTypes, ICity, ICountry } from "./types";
import http from "../../http_comon"

export const GetCountries = () => {
    return async (dispatch: Dispatch<HomeAction>) => {
        try {
            let response = await http.get<Array<ICountry>>('api/Country/get-all')
            dispatch({
                type: HomeActionTypes.GET_COUNTRIES,
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

export const GetCitiesByCountryId = (id: number) => {
    return async (dispatch: Dispatch<HomeAction>) => {
        try {
            if (id != 0) {
                let response = await http.get<Array<ICity>>(`api/City/get-cities-by-country-id/${id}`)
                dispatch({
                    type: HomeActionTypes.GET_CITIES_BY_COUNTRY_ID,
                    payload: response.data
                })
            }
            else {
                dispatch({
                    type: HomeActionTypes.GET_CITIES_BY_COUNTRY_ID,
                    payload: []
                })
            }
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