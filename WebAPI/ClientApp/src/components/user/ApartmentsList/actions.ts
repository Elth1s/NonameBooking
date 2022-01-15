import { Dispatch } from "react"
import { ApartmentsActionTypes, ApartmentAction, IApartmentResponse } from "./types"
import http from "../../../http_comon"
import { ISearch } from "../types"
import qs from "qs"



export const GetApartments = (cityId: string, countryId: string, search: ISearch) => {
    return async (dispatch: Dispatch<ApartmentAction>) => {
        try {
            let response = await http.get<IApartmentResponse>(`api/Apartment/search-by-city`, {
                params: {
                    cityId: cityId,
                    countryId: countryId,
                    take: 100,
                    page: 1,
                    priceRange: search.priceRange,
                    dateRange: search.dateRange,
                    typesOfApartment: search.typesOfApartment,
                    filters: search.filters,
                    beds: search.beds,
                    bedrooms: search.bedrooms,
                    bathrooms: search.bathrooms,
                },
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            })
            dispatch({
                type: ApartmentsActionTypes.GET_APARTMENTS,
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