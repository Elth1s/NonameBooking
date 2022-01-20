import { ProfileAction, ProfileActionTypes, ProfileState } from "./types";

const initialState: ProfileState = {
    userInfo: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        photo: ""
    }
}

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case ProfileActionTypes.GET_PROFILE:
            return {
                ...state,
                userInfo: action.payload,
            }
        default:
            return state;
    }
}