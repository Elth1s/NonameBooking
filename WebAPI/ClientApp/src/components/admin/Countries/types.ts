export enum CountriesActionTypes {
    GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID",
}


export interface ICountry {
    name: string
}


export interface CountryState {
    selectedCountry: ICountry
}

export interface CountryServerError {
    title: string,
    status: number,
    errors: Array<any>,
}



export interface GetCountryByIdAction {
    type: CountriesActionTypes.GET_COUNTRY_BY_ID,
    payload: ICountry
}

export type CountryAction = GetCountryByIdAction;