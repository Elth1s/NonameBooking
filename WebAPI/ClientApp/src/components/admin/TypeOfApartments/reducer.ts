import { TypeOfApartmentAction, AdminTypeOfApartmentsActionTypes, TypeOfApartmentState } from "./types";

const initialState: TypeOfApartmentState = {
    types: [],
    selectedType: {
        name: ""
    }
}

export const adminTypeOfApartmentReducer = (state = initialState, action: TypeOfApartmentAction): TypeOfApartmentState => {
    switch (action.type) {
        case AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENTS:
            return {
                ...state,
                types: action.payload
            }
        case AdminTypeOfApartmentsActionTypes.GET_ADMIN_TYPE_OF_APARTMENT_BY_ID:
            return {
                ...state,
                selectedType: action.payload
            }
        default:
            return state;
    }
}