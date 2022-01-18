export enum AdminCitiesActionTypes {
    GET_ADMIN_CITIES = "GET_ADMIN_CITIES",
    GET_ADMIN_CITY_BY_ID = "GET_ADMIN_CITY_BY_ID",
}

export interface ICityItem {
    id: number,
    name: string,
    countryName: string,
    image: string
}

export interface IAdminCity {
    name: string,
    countryId: string | number,
    countryName: string,
    image: string
}

export interface CityState {
    selectedCity: IAdminCity
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
    type: AdminCitiesActionTypes.GET_ADMIN_CITY_BY_ID,
    payload: IAdminCity
}

export type CityAction = GetCityByIdAction | GetCitiesAction;