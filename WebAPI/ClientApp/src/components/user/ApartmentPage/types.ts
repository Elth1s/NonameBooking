import { IDateRange, IFilterGroup } from "../types";

export enum ApartmentPageActionTypes {
    GET_APARTMENT = "GET_APARTMENT",
}

export interface IBestImage {
    img: string,
    rows?: number,
    cols?: number
}

export interface IApartment {
    id: number,
    name: string,
    description: string,
    price: number,
    typeOfApartmentId: number,
    typeOfApartmentName: string,
    countryId: number,
    countryName: string,
    cityId: number,
    cityName: string,
    ownerId: string,
    ownerFullName: string,
    beds: number,
    bedrooms: number,
    bathrooms: number,
    dates: Array<IDateRange>,
    images: Array<string>,
    filterGroupWithFilters: Array<IFilterGroup>,
}

export interface ApartmentState {
    selectedApartment: IApartment
}

export interface GetApartmentAction {
    type: ApartmentPageActionTypes.GET_APARTMENT,
    payload: IApartment
}

export type ApartmentAction = GetApartmentAction;