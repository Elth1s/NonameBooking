import { FilterGroupAction, AdminFilterGroupsActionTypes, FilterGroupState } from "./types";

const initialState: FilterGroupState = {
    groups: [],
    selectedGroup: {
        name: ""
    }
}

export const adminFilterGroupReducer = (state = initialState, action: FilterGroupAction): FilterGroupState => {
    switch (action.type) {
        case AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        case AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUP_BY_ID:
            return {
                ...state,
                selectedGroup: action.payload
            }
        default:
            return state;
    }
}