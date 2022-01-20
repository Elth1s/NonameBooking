import { CityAction, AdminCitiesActionTypes, CityState } from "./types";

const initialState: CityState = {
    cities: [],
    selectedCity: {
        countryId: "",
        countryName: "",
        image: "",
        name: ""
    }
}

export const adminCityReducer = (state = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case AdminCitiesActionTypes.GET_ADMIN_CITIES:
            return {
                ...state,
                cities: action.payload,
                selectedCity: {
                    countryId: "",
                    countryName: "",
                    image: "",
                    name: ""
                }
            }
        case AdminCitiesActionTypes.GET_ADMIN_CITY_BY_ID:
            return {
                ...state,
                selectedCity: action.payload
            }
        default:
            return state;
    }
}