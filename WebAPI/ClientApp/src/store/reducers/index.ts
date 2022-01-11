import { combineReducers } from "redux";
import { countryReducer } from "../../components/admin/Countries/reducer";
import { authReducer } from "../../components/auth/reducer";
import { homeReducer } from "../../components/Home/reducer";
import { profileReducer } from "../../components/user/Profile/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    country: countryReducer,
    profile: profileReducer
});

export type RootState = ReturnType<typeof rootReducer>;