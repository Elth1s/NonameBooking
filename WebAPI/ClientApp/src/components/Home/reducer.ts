import { HomeAction, HomeActionTypes, HomeState } from "./types";

const initialState: HomeState = {
    countries: [],
    cities: [],
}

export const homeReducer = (state = initialState, action: HomeAction): HomeState => {
    switch (action.type) {
        case HomeActionTypes.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            }
        case HomeActionTypes.GET_CITIES_BY_COUNTRY_ID:
            return {
                ...state,
                cities: action.payload,
            }
        default:
            return state;
    }
}