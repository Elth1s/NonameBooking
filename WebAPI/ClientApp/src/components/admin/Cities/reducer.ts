import { CityAction, AdminCitiesActionTypes, CityState } from "./types";

const initialState: CityState = {
    cities: [],
    selectedCity: {
        countryId: "",
        image: "",
        name: ""
    }
}

export const adminCityReducer = (state = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case AdminCitiesActionTypes.GET_ADMIN_CITIES:
            return {
                ...state,
                cities: action.payload
            }
        case AdminCitiesActionTypes.GET_CITY_BY_ID:
            return {
                ...state,
                selectedCity: action.payload
            }
        default:
            return state;
    }
}