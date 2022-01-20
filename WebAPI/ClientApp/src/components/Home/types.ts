export enum HomeActionTypes {
    GET_COUNTRIES = "GET_COUNTRIES",
    GET_CITIES_BY_COUNTRY_ID = "GET_CITIES_BY_COUNTRY_ID",
}




export interface ISearch {
    countryId: string,
    cityId: string,
}

export interface ICountry {
    id: number,
    name: string,
    code: string
}
export interface ICity {
    id: number,
    name: string,
}


export interface HomeState {
    countries: Array<ICountry>
    cities: Array<ICity>,
}





export interface GetCountriesAction {
    type: HomeActionTypes.GET_COUNTRIES,
    payload: Array<ICountry>
}

export interface GetCitiesByCountryIdAction {
    type: HomeActionTypes.GET_CITIES_BY_COUNTRY_ID,
    payload: Array<ICity>,
}

export type HomeAction = GetCountriesAction | GetCitiesByCountryIdAction;