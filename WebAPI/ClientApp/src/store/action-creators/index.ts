import * as AuthActionCreators from "../../components/auth/actions"
import * as HomeActionCreators from "../../components/Home/actions"
import * as CountryActionCreators from "../../components/admin/Countries/actions"
import * as ProfileActionCreators from "../../components/user/Profile/actions"

export default {
    ...AuthActionCreators,
    ...HomeActionCreators,
    ...CountryActionCreators,
    ...ProfileActionCreators
}
