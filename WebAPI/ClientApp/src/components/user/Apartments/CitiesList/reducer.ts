import { CitiesActionTypes, CityAction, CityState } from "./types";

const initialState: CityState = {
    cities: []
}

export const userCityReducer = (state = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case CitiesActionTypes.GET_CITIES:
            return {
                ...state,
                cities: action.payload,
            }
        default:
            return state;
    }
}