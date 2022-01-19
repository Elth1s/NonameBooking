import { UserApartmentAction, UserApartmentsActionTypes, UserApartmentState } from "./types";

const initialState: UserApartmentState = {
    apartments: [],
    selectedApartment: {
        name: "",
        description: "",
        price: 0,
        typeOfApartmentId: 0,
        typeOfApartmentName: "",
        countryId: 0,
        countryName: "",
        cityId: 0,
        cityName: "",
        address: "",
        ownerId: "",
        ownerFullName: "",
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        images: [],
        filterGroupWithFilters: [],
    },
    orders: [],
    selectedOrder: {
        start: "",
        end: "",
        userFullName: "",
        apartmentName: "",
        apartmentId: "",
        orderStatusName: "",
        total: 0
    }
}

export const currentUserApartmentReducer = (state = initialState, action: UserApartmentAction): UserApartmentState => {
    switch (action.type) {
        case UserApartmentsActionTypes.GET_USER_APARTMENTS:
            return {
                ...state,
                apartments: action.payload,
                selectedApartment: {
                    name: "",
                    description: "",
                    price: 0,
                    typeOfApartmentId: 0,
                    typeOfApartmentName: "",
                    countryId: 0,
                    countryName: "",
                    cityId: 0,
                    cityName: "",
                    address: "",
                    ownerId: "",
                    ownerFullName: "",
                    beds: 0,
                    bedrooms: 0,
                    bathrooms: 0,
                    images: [],
                    filterGroupWithFilters: [],
                }
            }
        case UserApartmentsActionTypes.GET_USER_APARTMENT_BY_ID:
            return {
                ...state,
                selectedApartment: action.payload
            }
        case UserApartmentsActionTypes.GET_APARTMENT_ORDERS_BY_ID:
            return {
                ...state,
                orders: action.payload
            }
        case UserApartmentsActionTypes.GET_APARTMENT_SELECTED_ORDER_BY_ID:
            return {
                ...state,
                selectedOrder: action.payload
            }
        default:
            return state;
    }
}