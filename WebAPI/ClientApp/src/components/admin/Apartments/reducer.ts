import { ApartmentAction, AdminApartmentsActionTypes, ApartmentState } from "./types";

const initialState: ApartmentState = {
    apartments: []
}

export const adminApartmentReducer = (state = initialState, action: ApartmentAction): ApartmentState => {
    switch (action.type) {
        case AdminApartmentsActionTypes.GET_ADMIN_APARTMENTS:
            return {
                ...state,
                apartments: action.payload,
            }
        default:
            return state;
    }
}