import { CitiesActionTypes, CityAction, CityState } from "./types";

const initialState: CityState = {
    citiesWithApartment: [],
    citiesWithoutApartment: []
}

export const userCityReducer = (state = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case CitiesActionTypes.GET_CITIES:
            return {
                ...state,
                citiesWithApartment: action.payload.citiesWithApartment,
                citiesWithoutApartment: action.payload.citiesWithoutApartment,
            }
        default:
            return state;
    }
}