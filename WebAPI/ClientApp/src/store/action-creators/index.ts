import * as AuthActionCreators from "../../components/auth/actions"
import * as HomeActionCreators from "../../components/Home/actions"
import * as CountryActionCreators from "../../components/admin/Countries/actions"
import * as ProfileActionCreators from "../../components/user/Profile/actions"
import * as UserCitiesActionCreators from "../../components/user/Apartments/CitiesList/actions"

export default {
    ...AuthActionCreators,
    ...HomeActionCreators,
    ...CountryActionCreators,
    ...ProfileActionCreators,
    ...UserCitiesActionCreators
}
