import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/reducer";
import { homeReducer } from "../../components/Home/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer
});

export type RootState = ReturnType<typeof rootReducer>;