import { HomeAction, HomeActionTypes, HomeState } from "./types";

const initialState: HomeState = {
    search: {
        country: "",
        city: "",
    },
    countries: []
}

export const homeReducer = (state = initialState, action: HomeAction): HomeState => {
    switch (action.type) {
        case HomeActionTypes.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            }
        default:
            return state;
    }
}