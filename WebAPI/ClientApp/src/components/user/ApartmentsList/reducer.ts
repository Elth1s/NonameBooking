import { ApartmentAction, ApartmentsActionTypes, ApartmentState } from "./types";

const initialState: ApartmentState = {
    count: 0,
    cityName: "",
    apartments: []
}

export const userApartmentReducer = (state = initialState, action: ApartmentAction): ApartmentState => {
    switch (action.type) {
        case ApartmentsActionTypes.GET_APARTMENTS:
            return {
                ...state,
                count: action.payload.count,
                cityName: action.payload.cityName,
                apartments: action.payload.apartments,
            }
        default:
            return state;
    }
}