
interface IPriceRange {
    start: number,
    end: number
}

interface IDateRange {
    start: Date,
    end: Date,
}
export interface ISearch {
    priceRange: IPriceRange | null,
    dateRange: IDateRange | null,
    typesOfApartment: Array<number> | null,
    filters: Array<number> | null,
    beds: number,
    bedrooms: number,
    bathrooms: number,
}