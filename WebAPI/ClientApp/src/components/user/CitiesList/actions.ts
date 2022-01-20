import { Dispatch } from "react"
import { CitiesActionTypes, CityAction, ICity, CityState } from "./types"
import http from "../../../http_comon"
import { ISearch } from "../types"
import qs from "qs"



export const GetCitiesWithApartments = (search: ISearch) => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            let response = await http.get<Array<ICity>>(`api/Apartment/search-group-by-city`, {
                params: {
                    countryId: search.countryId,
                    takeApartments: 5,
                    takeCityGroup: 18,
                    takeCityGroupWithApartment: 3,
                    priceRange: (search.priceStart == null || search.priceEnd == null || search.priceStart == "" || search.priceEnd == "") ? null : { start: search.priceStart, end: search.priceEnd },
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
            let сityState: CityState = { citiesWithApartment: [], citiesWithoutApartment: [] };
            response.data.forEach(city => {
                if (city.apartments)
                    сityState.citiesWithApartment.push(city)
                else
                    сityState.citiesWithoutApartment.push(city)
            });
            dispatch({
                type: CitiesActionTypes.GET_CITIES,
                payload: сityState
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