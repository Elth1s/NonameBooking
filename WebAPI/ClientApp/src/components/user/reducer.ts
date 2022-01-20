import { SearchAction, SearchActionTypes, SearchState } from "./types";

const initialState: SearchState = {
    filterGroups: [],
    typeOfApartments: [],
}

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
    switch (action.type) {
        case SearchActionTypes.GET_FILTERS_FOR_SEARCH:
            return {
                ...state,
                filterGroups: action.payload,
            }
        case SearchActionTypes.GET_TYPES_OF_APARTMENT_FOR_SEARCH:
            return {
                ...state,
                typeOfApartments: action.payload,
            }
        default:
            return state;
    }
}