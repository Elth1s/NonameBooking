import { ApartmentAction, ApartmentPageActionTypes, ApartmentState } from "./types";

const initialState: ApartmentState = {
    selectedApartment: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        typeOfApartmentId: 0,
        typeOfApartmentName: "",
        countryId: 0,
        countryName: "",
        cityId: 0,
        cityName: "",
        ownerId: "",
        ownerFullName: "",
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        dates: [],
        images: [],
        filterGroupWithFilters: [],
    }
}

export const userApartmentPageReducer = (state = initialState, action: ApartmentAction): ApartmentState => {
    switch (action.type) {
        case ApartmentPageActionTypes.GET_APARTMENT:
            return {
                ...state,
                selectedApartment: action.payload,
            }
        default:
            return state;
    }
}