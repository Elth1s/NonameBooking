import { ApartmentAction, ApartmentPageActionTypes, ApartmentState } from "./types";

const initialState: ApartmentState = {
    selectedApartment: null
}

export const userApartmentPageReducer = (state = initialState, action: ApartmentAction): ApartmentState => {
    switch (action.type) {
        case ApartmentPageActionTypes.GET_APARTMENT:
            return {
                ...state,
                selectedApartment: action.payload,
            }
        default:
            return state;
    }
}