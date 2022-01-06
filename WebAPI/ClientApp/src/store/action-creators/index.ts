import * as AuthActionCreators from "../../components/auth/actions"
import * as HomeActionCreators from "../../components/Home/actions"

export default {
    ...AuthActionCreators,
    ...HomeActionCreators
}
