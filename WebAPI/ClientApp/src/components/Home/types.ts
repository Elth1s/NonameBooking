export enum HomeActionTypes {
    GET_COUNTRIES = "GET_COUNTRIES",
}




export interface ISearch {
    country: string,
    city: string,
}

export interface ICountry {
    id: number,
    name: string
}


export interface HomeState {
    search: ISearch,
    countries: Array<ICountry>
}





export interface GetCountriesAction {
    type: HomeActionTypes.GET_COUNTRIES,
    payload: Array<ICountry>
}

export type HomeAction = GetCountriesAction;