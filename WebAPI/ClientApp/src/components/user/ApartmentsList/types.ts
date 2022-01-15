export enum ApartmentsActionTypes {
    GET_APARTMENTS = "GET_APARTMENTS",
}


export interface IApartment {
    id: number,
    name: string,
    price: number,
    typeOfApartmentName: string,
    cityName: string,
    beds: number,
    bedrooms: number,
    bathrooms: number,
    images: Array<string>,
    filterName: Array<string>,
}


export interface ApartmentState {
    apartments: Array<IApartment>,
}

export interface GetApartmentsAction {
    type: ApartmentsActionTypes.GET_APARTMENTS,
    payload: Array<IApartment>,
}

export type ApartmentAction = GetApartmentsAction;