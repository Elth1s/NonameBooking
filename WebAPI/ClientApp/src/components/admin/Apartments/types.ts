export enum AdminApartmentsActionTypes {
    GET_ADMIN_APARTMENTS = "GET_ADMIN_APARTMENTS",
}

export interface IApartmentItem {
    id: number,
    name: string,
    price: number,
    typeOfApartmentName: string,
    cityName: string
}

export interface ApartmentState {
    apartments: Array<IApartmentItem>
}

export interface ApartmentServerError {
    title: string,
    status: number,
    errors: Array<any>,
}

export interface GetApartmentsAction {
    type: AdminApartmentsActionTypes.GET_ADMIN_APARTMENTS,
    payload: Array<IApartmentItem>
}


export type ApartmentAction = GetApartmentsAction;