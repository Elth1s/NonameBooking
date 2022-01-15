import * as AuthActionCreators from "../../components/auth/actions"
import * as HomeActionCreators from "../../components/Home/actions"
import * as CountryActionCreators from "../../components/admin/Countries/actions"
import * as ProfileActionCreators from "../../components/user/Profile/actions"
import * as UserCitiesActionCreators from "../../components/user/CitiesList/actions"
import * as ChangePasswordActionCreators from "../../components/comon/ChangePasswordDialog/actions"
import * as UserApartmentsActionCreators from "../../components/user/ApartmentsList/actions"

export default {
    ...AuthActionCreators,
    ...HomeActionCreators,
    ...CountryActionCreators,
    ...ProfileActionCreators,
    ...UserCitiesActionCreators,
    ...ChangePasswordActionCreators,
    ...UserApartmentsActionCreators
}
