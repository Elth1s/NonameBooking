export enum ApartmentPageActionTypes {
    GET_APARTMENT = "GET_APARTMENT",
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
    selectedApartment: IApartment | null
}

export interface GetApartmentAction {
    type: ApartmentPageActionTypes.GET_APARTMENT,
    payload: IApartment
}

export type ApartmentAction = GetApartmentAction;