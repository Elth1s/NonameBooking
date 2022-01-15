import { CityAction, CitiesActionTypes, CityState } from "./types";

const initialState: CityState = {
    cities: [],
    selectedCity: {
        countryId: "",
        image: "",
        name: ""
    }
}

export const cityReducer = (state = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case CitiesActionTypes.GET_CITIES:
            return {
                ...state,
                cities: action.payload
            }
        case CitiesActionTypes.GET_CITY_BY_ID:
            return {
                ...state,
                selectedCity: action.payload
            }
        default:
            return state;
    }
}