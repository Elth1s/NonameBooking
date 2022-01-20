import { FilterAction, AdminFiltersActionTypes, FilterState } from "./types";

const initialState: FilterState = {
    filters: [],
    selectedFilter: {
        filterGroupId: "",
        filterGroupName: "",
        name: ""
    }
}

export const adminFilterReducer = (state = initialState, action: FilterAction): FilterState => {
    switch (action.type) {
        case AdminFiltersActionTypes.GET_ADMIN_FILTERS:
            return {
                ...state,
                filters: action.payload,
                selectedFilter: {
                    filterGroupId: "",
                    filterGroupName: "",
                    name: ""
                }
            }
        case AdminFiltersActionTypes.GET_ADMIN_FILTER_BY_ID:
            return {
                ...state,
                selectedFilter: action.payload
            }
        default:
            return state;
    }
}