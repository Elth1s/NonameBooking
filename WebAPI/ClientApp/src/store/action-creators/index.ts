import * as AuthActionCreators from "../../components/auth/actions"
import * as HomeActionCreators from "../../components/Home/actions"
import * as CountryActionCreators from "../../components/admin/Countries/actions"
import * as ProfileActionCreators from "../../components/user/Profile/actions"
import * as ChangePasswordActionCreators from "../../components/comon/ChangePasswordDialog/actions"
import * as UserApartmentsActionCreators from "../../components/user/ApartmentsList/actions"
import * as UserCitiesActionCreators from "../../components/user/CitiesList/actions"
import * as AdminCitiesActionCreators from "../../components/admin/Cities/actions";
import * as AdminTypeOfApartmentsActionCreators from "../../components/admin/TypeOfApartments/actions"
import * as AdminFilterGroupsActionCreators from "../../components/admin/FilterGroups/actions"
import * as AdminApartmentsActionCreators from "../../components/admin/Apartments/actions"
import * as AdminFiltersActionCreators from "../../components/admin/Filters/actions"
import * as UserApartmentPageActionCreators from "../../components/user/ApartmentPage/actions"
import * as CurrentUserApartmentActionCreators from "../../components/user/Apartments/actions"
const actions = {
    ...AuthActionCreators,
    ...HomeActionCreators,
    ...CountryActionCreators,
    ...ProfileActionCreators,
    ...ChangePasswordActionCreators,
    ...UserApartmentsActionCreators,
    ...UserCitiesActionCreators,
    ...AdminCitiesActionCreators,
    ...AdminTypeOfApartmentsActionCreators,
    ...AdminFilterGroupsActionCreators,
    ...AdminFiltersActionCreators,
    ...AdminApartmentsActionCreators,
    ...UserApartmentPageActionCreators,
    ...CurrentUserApartmentActionCreators
}
export default actions;