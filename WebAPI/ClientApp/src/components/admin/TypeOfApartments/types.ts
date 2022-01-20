export enum AdminTypeOfApartmentsActionTypes {
    GET_ADMIN_TYPE_OF_APARTMENTS = " GET_ADMIN_TYPE_OF_APARTMENTS",
    GET_ADMIN_TYPE_OF_APARTMENT_BY_ID = "GET_ADMIN_TYPE_OF_APARTMENT_BY_ID",
}

export interface ITypeOfApartmentItem {
    id: number,
    name: string,
}

export interface IAdminTypeOfApartment {
    name: string,
}

export interface TypeOfApartmentState {
    selectedType: IAdminTypeOfApartment
    types: Array<ITypeOfApartmentItem>
}

export interface TypeOfApartmentServerError {
    title: string,
    status: number,
    errors: Array<any>,
}
export interface GetTypeOfApartmentsAction {
    type: AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENTS,
    payload: Array<ITypeOfApartmentItem>
}

export interface GetTypeOfApartmentByIdAction {
    type: AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENT_BY_ID,
    payload: IAdminTypeOfApartment
}

export type TypeOfApartmentAction = GetTypeOfApartmentsAction | GetTypeOfApartmentByIdAction;