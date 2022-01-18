
export enum UserApartmentsActionTypes {
    GET_USER_APARTMENTS = "GET_USER_APARTMENTS",
    GET_USER_APARTMENT_BY_ID = "GET_USER_APARTMENT_BY_ID",
}
export interface IFilter {
    id: number,
    name: string,
}

export interface IFilterGroup {
    id: number,
    name: string,
    filters: Array<IFilter>
}
export interface IApartment {
    name: string,
    description: string,
    price: number,
    typeOfApartmentId: number,
    typeOfApartmentName: string,
    countryId: number,
    countryName: string,
    address: string,
    cityId: number,
    cityName: string,
    ownerId: string,
    ownerFullName: string,
    beds: number,
    bedrooms: number,
    bathrooms: number,
    images: Array<string>,
    filterGroupWithFilters: Array<IFilterGroup>,
}
export interface IApartmentItem {
    id: number,
    name: string,
    price: number,
    typeOfApartmentName: string,
    cityName: string
}

export interface UserApartmentState {
    apartments: Array<IApartmentItem>,
    selectedApartment: IApartment
}

export interface ApartmentServerError {
    title: string,
    status: number,
    errors: Array<any>,
}

export interface GetApartmentsAction {
    type: UserApartmentsActionTypes.GET_USER_APARTMENTS,
    payload: Array<IApartmentItem>
}

export interface GetApartmentByIdAction {
    type: UserApartmentsActionTypes.GET_USER_APARTMENT_BY_ID,
    payload: IApartment
}

export type UserApartmentAction = GetApartmentsAction | GetApartmentByIdAction;