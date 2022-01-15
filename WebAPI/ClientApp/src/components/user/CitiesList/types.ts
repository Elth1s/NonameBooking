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
    apartments: Array<IApartment>
}


export interface CityState {
    citiesWithApartment: Array<ICity>,
    citiesWithoutApartment: Array<ICity>,
}

export interface GetCitiesAction {
    type: CitiesActionTypes.GET_CITIES,
    payload: CityState
}

export type CityAction = GetCitiesAction;