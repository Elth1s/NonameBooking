import { combineReducers } from "redux";
import { countryReducer } from "../../components/admin/Countries/reducer";
import { authReducer } from "../../components/auth/reducer";
import { homeReducer } from "../../components/Home/reducer";
import { profileReducer } from "../../components/user/Profile/reducer";
import { userCityReducer } from "../../components/user/CitiesList/reducer";
import { userApartmentReducer } from "../../components/user/ApartmentsList/reducer"
import { adminCityReducer } from "../../components/admin/Cities/reducer";
import { userApartmentPageReducer } from "../../components/user/ApartmentPage/reducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    country: countryReducer,
    profile: profileReducer,
    userCity: userCityReducer,
    userApartment: userApartmentReducer,
    adminCity: adminCityReducer,
    userApartmentPage: userApartmentPageReducer
});

export type RootState = ReturnType<typeof rootReducer>;