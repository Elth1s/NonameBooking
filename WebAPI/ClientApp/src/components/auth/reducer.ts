import {
    AuthAction,
    AuthActionTypes,
    AuthState,
    ProfileAction
} from "./types"

const initialState: AuthState = {
    user: {
        name: "",
        surname: "",
        image: ""
    },
    isAuth: false,
}

export const authReducer = (state = initialState, action: AuthAction | ProfileAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        case AuthActionTypes.GET_PROFILE:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}