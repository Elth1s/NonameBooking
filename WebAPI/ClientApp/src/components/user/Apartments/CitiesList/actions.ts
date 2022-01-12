import { Dispatch } from "react"
import { CitiesActionTypes, CityAction, ICity } from "./types"
import http from "../../../../http_comon"
import { ISearch } from "../types"
import qs from "qs"



export const GetCitiesWithApartments = (id: string, search: ISearch) => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            let response = await http.get<Array<ICity>>(`api/Apartment/search-group-by-city`, {
                params: {
                    countryId: id,
                    takeApartments: 4,
                    takeCityGroup: 23,
                    takeCityGroupWithApartment: 3,
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
                type: CitiesActionTypes.GET_CITIES,
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