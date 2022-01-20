export enum AdminFilterGroupsActionTypes {
    GET_ADMIN_FILTER_GROUPS = "GET_ADMIN_FILTER_GROUPS",
    GET_ADMIN_FILTER_GROUP_BY_ID = "GET_ADMIN_FILTER_GROUP_BY_ID",
}

export interface IFilterGroupItem {
    id: number,
    name: string,
}

export interface IAdminFilterGroup {
    name: string,
}

export interface FilterGroupState {
    selectedGroup: IAdminFilterGroup
    groups: Array<IFilterGroupItem>
}

export interface FilterGroupServerError {
    title: string,
    status: number,
    errors: Array<any>,
}
export interface GetFilterGroupsAction {
    type: AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUPS,
    payload: Array<IFilterGroupItem>
}

export interface GetTypeOfApartmentByIdAction {
    type: AdminFilterGroupsActionTypes.GET_ADMIN_FILTER_GROUP_BY_ID,
    payload: IAdminFilterGroup
}

export type FilterGroupAction = GetFilterGroupsAction | GetTypeOfApartmentByIdAction;