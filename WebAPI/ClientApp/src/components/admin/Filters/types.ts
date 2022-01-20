export enum AdminFiltersActionTypes {
    GET_ADMIN_FILTERS = "GET_ADMIN_FILTERS",
    GET_ADMIN_FILTER_BY_ID = "GET_ADMIN_FILTER_BY_ID",
}

export interface IFilterItem {
    id: number,
    name: string,
    filterGroupName: string,
}

export interface IAdminFilter {
    name: string,
    filterGroupId: string | number,
    filterGroupName: string,
}

export interface FilterState {
    selectedFilter: IAdminFilter
    filters: Array<IFilterItem>
}

export interface FilterServerError {
    title: string,
    status: number,
    errors: Array<any>,
}
export interface GetFiltersAction {
    type: AdminFiltersActionTypes.GET_ADMIN_FILTERS,
    payload: Array<IFilterItem>
}

export interface GetFiltersByIdAction {
    type: AdminFiltersActionTypes.GET_ADMIN_FILTER_BY_ID,
    payload: IAdminFilter
}

export type FilterAction = GetFiltersByIdAction | GetFiltersAction;