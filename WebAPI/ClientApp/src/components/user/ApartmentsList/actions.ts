import { Dispatch } from "react"
import { ApartmentsActionTypes, ApartmentAction, IApartmentResponse } from "./types"
import http from "../../../http_comon"
import { IPriceRange, ISearch } from "../types"
import qs from "qs"
import axios, { AxiosError } from "axios"



export const GetApartments = (cityId: number, page: number, search: ISearch) => {
    return async (dispatch: Dispatch<ApartmentAction>) => {
        try {
            search.priceEnd = search.priceEnd == "10000" ? "10000000" : search.priceEnd
            let response = await http.get<IApartmentResponse>(`api/Apartment/search-by-city`, {
                params: {
                    cityId: cityId,
                    countryId: search.countryId,
                    take: 4,
                    page: page,
                    PriceRange: (search.priceStart == null || search.priceEnd == null || search.priceStart == "" || search.priceEnd == "") ? null : { start: search.priceStart, end: search.priceEnd },
                    dateRange: null,
                    typesOfApartment: search.typesOfApartment,
                    filters: search.filters,
                    beds: search.beds == '' || search.beds == null ? 0 : search.beds,
                    bedrooms: search.bedrooms == '' || search.bedrooms == null ? 0 : search.bedrooms,
                    bathrooms: search.bathrooms == '' || search.bathrooms == null ? 0 : search.bathrooms,
                },
                paramsSerializer: params => {
                    return qs.stringify({ ...params }, { allowDots: true })
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
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}