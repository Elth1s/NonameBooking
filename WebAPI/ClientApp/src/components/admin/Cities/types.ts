export enum AdminCitiesActionTypes {
    GET_ADMIN_CITIES = "GET_ADMIN_CITIES",
    GET_CITY_BY_ID = "GET_CITY_BY_ID",
}

export interface ICityItem {
    id: number,
    name: string,
    countryName: number,
    image: string
}

export interface ICity {
    name: string,
    countryId: string,
    image: string
}

export interface CityState {
    selectedCity: ICity
    cities: Array<ICityItem>
}

export interface CityServerError {
    title: string,
    status: number,
    errors: Array<any>,
}
export interface GetCitiesAction {
    type: AdminCitiesActionTypes.GET_ADMIN_CITIES,
    payload: Array<ICityItem>
}

export interface GetCityByIdAction {
    type: AdminCitiesActionTypes.GET_CITY_BY_ID,
    payload: ICity
}

export type CityAction = GetCityByIdAction | GetCitiesAction;