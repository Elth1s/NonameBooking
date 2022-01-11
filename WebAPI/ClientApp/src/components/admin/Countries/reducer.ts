import { CountryAction, CountriesActionTypes, CountryState } from "./types";

const initialState: CountryState = {
    selectedCountry: {
        name: "",
    }
}

export const countryReducer = (state = initialState, action: CountryAction): CountryState => {
    switch (action.type) {
        case CountriesActionTypes.GET_COUNTRY_BY_ID:
            return {
                ...state,
                selectedCountry: action.payload,
            }
        default:
            return state;
    }
}