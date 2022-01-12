export enum CitiesActionTypes {
    GET_CITIES = "GET_CITIES",
}


export interface IApartment {
    id: number,
    name: string,
    price: number,
    images: Array<string>
}

export interface ICity {
    id: number,
    name: string,
    image: string,
    Apartments?: Array<IApartment>
}


export interface CityState {
    cities: Array<ICity>
}

export interface GetCitiesAction {
    type: CitiesActionTypes.GET_CITIES,
    payload: Array<ICity>,
}

export type CityAction = GetCitiesAction;