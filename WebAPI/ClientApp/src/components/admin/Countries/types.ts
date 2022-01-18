export enum CountriesActionTypes {
    GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID",
}


export interface IAdminCountry {
    name: string,
    code: string
}

export interface CountryState {
    selectedCountry: IAdminCountry
}

export interface CountryServerError {
    title: string,
    status: number,
    errors: Array<any>,
}

export interface GetCountryByIdAction {
    type: CountriesActionTypes.GET_COUNTRY_BY_ID,
    payload: IAdminCountry
}

export type CountryAction = GetCountryByIdAction;