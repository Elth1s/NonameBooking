import { combineReducers } from "redux";
import { countryReducer } from "../../components/admin/Countries/reducer";
import { authReducer } from "../../components/auth/reducer";
import { homeReducer } from "../../components/Home/reducer";
import { profileReducer } from "../../components/user/Profile/reducer";
import { userCityReducer } from "../../components/user/CitiesList/reducer";
import { userApartmentReducer } from "../../components/user/ApartmentsList/reducer"
import { adminCityReducer } from "../../components/admin/Cities/reducer";
import { adminTypeOfApartmentReducer } from "../../components/admin/TypeOfApartments/reducer";
import { adminFilterGroupReducer } from "../../components/admin/FilterGroups/reducer";
import { adminFilterReducer } from "../../components/admin/Filters/reducer";
import { adminApartmentReducer } from "../../components/admin/Apartments/reducer";
import { userApartmentPageReducer } from "../../components/user/ApartmentPage/reducer"
import { currentUserApartmentReducer } from "../../components/user/Apartments/reducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    country: countryReducer,
    profile: profileReducer,
    userCity: userCityReducer,
    userApartment: userApartmentReducer,
    adminCity: adminCityReducer,
    adminTypeOfApartment: adminTypeOfApartmentReducer,
    adminFilterGroup: adminFilterGroupReducer,
    adminFilter: adminFilterReducer,
    adminApartment: adminApartmentReducer,
    userApartmentPage: userApartmentPageReducer,
    currentUserApartment: currentUserApartmentReducer
});

export type RootState = ReturnType<typeof rootReducer>;