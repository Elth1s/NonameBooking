import { Dispatch } from "react"
import { ApartmentsActionTypes, ApartmentAction, IApartmentResponse } from "./types"
import http from "../../../http_comon"
import { ISearch } from "../types"
import qs from "qs"



export const GetApartments = (cityId: number, page: number, search: ISearch) => {
    return async (dispatch: Dispatch<ApartmentAction>) => {
        try {
            let response = await http.get<IApartmentResponse>(`api/Apartment/search-by-city`, {
                params: {
                    cityId: cityId,
                    countryId: search.countryId,
                    take: 4,
                    page: page,
                    priceRange: { start: search.priceStart, end: search.priceEnd },
                    dateRange: { start: search.dateStart, end: search.dateEnd },
                    typesOfApartment: search.typesOfApartment,
                    filters: search.filters,
                    beds: search.beds == '' || search.beds == null ? 0 : search.beds,
                    bedrooms: search.bedrooms == '' || search.bedrooms == null ? 0 : search.bedrooms,
                    bathrooms: search.bathrooms == '' || search.bathrooms == null ? 0 : search.bathrooms,
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