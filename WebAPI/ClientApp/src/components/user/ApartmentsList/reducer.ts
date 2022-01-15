import { ApartmentAction, ApartmentsActionTypes, ApartmentState } from "./types";

const initialState: ApartmentState = {
    apartments: []
}

export const userApartmentReducer = (state = initialState, action: ApartmentAction): ApartmentState => {
    switch (action.type) {
        case ApartmentsActionTypes.GET_APARTMENTS:
            return {
                ...state,
                apartments: action.payload,
            }
        default:
            return state;
    }
}