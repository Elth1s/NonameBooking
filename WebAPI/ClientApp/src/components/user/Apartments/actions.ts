import { Dispatch } from "react"
import { UserApartmentAction, IApartment, UserApartmentsActionTypes, IOrder, IOrderItem, IApartmentItem, ApartmentServerError, IApartmentResponse, IFilter } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetUserApartments = (userId: string) => {
    return async (dispatch: Dispatch<UserApartmentAction>) => {
        try {
            let response = await http.get<Array<IApartmentItem>>(`api/Apartment/get-by-owner-id/${userId}`)
            dispatch({
                type: UserApartmentsActionTypes.GET_USER_APARTMENTS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const CreateApartment = (data: IApartment, images: Array<File> | null) => {
    return async () => {

        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("address", data.address);
            formData.append("countryId", data.countryId.toString());
            formData.append("cityId", data.cityId.toString());
            formData.append("price", data.price.toString());
            formData.append("typeOfApartmentId", data.typeOfApartmentId.toString());
            formData.append("ownerId", data.ownerId);
            formData.append("bathrooms", data.bathrooms.toString());
            formData.append("bedrooms", data.bedrooms.toString());
            formData.append("beds", data.beds.toString());
            if (images != null && images?.length != 0) {
                images.forEach(element => {
                    formData.append("images", element);
                });
            }
            if (data.filters != null && data.filters?.length != 0) {
                data.filters.forEach(element => {
                    formData.append("FiltersId", element.id.toString());
                });
            }

            let response = await http.post('api/Apartment/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const UpdateApartment = (id: string, data: IApartment, images: Array<File> | null, imagesForDelete: Array<string> | null) => {
    return async () => {

        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("address", data.address);
            formData.append("countryId", data.countryId.toString());
            formData.append("cityId", data.cityId.toString());
            formData.append("price", data.price.toString());
            formData.append("typeOfApartmentId", data.typeOfApartmentId.toString());
            formData.append("ownerId", data.ownerId);
            formData.append("bathrooms", data.bathrooms.toString());
            formData.append("bedrooms", data.bedrooms.toString());
            formData.append("beds", data.beds.toString());
            if (images != null && images?.length != 0) {
                images.forEach(element => {
                    formData.append("images", element);
                });
            }
            if (data.filters != null && data.filters?.length != 0) {
                data.filters.forEach(element => {
                    formData.append("FiltersId", element.id.toString());
                });
            }
            if (imagesForDelete != null && imagesForDelete.length != 0) {
                imagesForDelete.forEach(element => {
                    formData.append("removedImages", element);
                });
            }
            let response = await http.put(`api/Apartment/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const GetUserApartment = (id: string) => {
    return async (dispatch: Dispatch<UserApartmentAction>) => {
        try {
            let response = await http.get<IApartmentResponse>(`api/Apartment/get-by-id/${id}`)
            let { data } = response;
            let filters = [] as Array<IFilter>;
            data.filterGroupWithFilters.forEach(filterGroup => {
                filterGroup.filters.forEach(filter => {
                    filters.push(filter);
                });
            });
            let Apartment = {
                name: data.name,
                description: data.description,
                price: data.price,
                typeOfApartmentId: data.typeOfApartmentId,
                typeOfApartmentName: data.typeOfApartmentName,
                countryId: data.countryId,
                countryName: data.countryName,
                address: data.address,
                cityId: data.cityId,
                cityName: data.cityName,
                ownerId: data.ownerId,
                ownerFullName: data.ownerFullName,
                beds: data.beds,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                images: data.images,
                filters: filters,
            }

            dispatch({
                type: UserApartmentsActionTypes.GET_USER_APARTMENT_BY_ID,
                payload: Apartment
            })
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}
export const DeleteApartment = (id: string) => {
    return async () => {
        try {
            await http.delete(`api/Apartment/delete/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetApartmentOrdersById = (id: string) => {
    return async (dispatch: Dispatch<UserApartmentAction>) => {
        try {
            let response = await http.get<Array<IOrderItem>>(`api/Order/get-by-apartment-id/${id}`);
            const data = response.data;
            dispatch({
                type: UserApartmentsActionTypes.GET_APARTMENT_ORDERS_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const GetApartmentSelectedOrderByIdAction = (id: string) => {
    return async (dispatch: Dispatch<UserApartmentAction>) => {
        try {
            let response = await http.get<IOrder>(`api/Order/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: UserApartmentsActionTypes.GET_APARTMENT_SELECTED_ORDER_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const BookedOrder = (id: string) => {
    return async () => {
        try {
            await http.put(`api/Order/edit-status-to-booked/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ApartmentServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}