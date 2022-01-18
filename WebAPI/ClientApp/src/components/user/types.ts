export enum SearchActionTypes {
    GET_FILTERS_FOR_SEARCH = "GET_FILTERS_FOR_SEARCH",
    GET_TYPES_OF_APARTMENT_FOR_SEARCH = "GET_TYPES_OF_APARTMENT_FOR_SEARCH",
}


export interface IPriceRange {
    start: number,
    end: number
}
export interface ITypeOfApartment {
    id: number,
    name: string
}
export interface IDateRange {
    start: Date,
    end: Date,
}

export interface IFilter {
    id: number,
    name: string,
}

export interface IFilterGroup {
    id: number,
    name: string,
    filters: Array<IFilter>
}

export interface ISearch {
    countryId: string | null,
    priceStart: string | null,
    priceEnd: string | null,
    dateStart: string | null,
    dateEnd: string | null,
    typesOfApartment: Array<string>,
    filters: Array<string>,
    beds: string | null,
    bedrooms: string | null,
    bathrooms: string | null,
}

export interface SearchState {
    filterGroups: Array<IFilterGroup>
    typeOfApartments: Array<ITypeOfApartment>,
}

export interface GetFiltersForSearch {
    type: SearchActionTypes.GET_FILTERS_FOR_SEARCH,
    payload: Array<IFilterGroup>
}

export interface GetTypesOfApartmentForSearch {
    type: SearchActionTypes.GET_TYPES_OF_APARTMENT_FOR_SEARCH,
    payload: Array<ITypeOfApartment>,
}

export type SearchAction = GetFiltersForSearch | GetTypesOfApartmentForSearch;