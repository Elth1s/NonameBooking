import { Dispatch } from "react"
import { UserApartmentAction, IApartment, UserApartmentsActionTypes, IOrder, IOrderItem, IApartmentItem, ApartmentServerError } from "./types";
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
export const CreateApartment = (data: IApartment, image: Array<File> | null) => {
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
            if (image) {
                formData.append("image", image[0]);
            }

            let response = await http.post('api/Apartment/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            console.log(1)
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
export const UpdateApartment = (id: string, data: IApartment, image: Array<File> | null) => {
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
            if (image) {
                formData.append("image", image[0]);
            }

            let response = await http.put(`api/Apartment/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve();
        }
        catch (ex) {
            console.log(1)
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
            let response = await http.get<IApartment>(`api/Apartment/get-by-id/${id}`)
            dispatch({
                type: UserApartmentsActionTypes.GET_USER_APARTMENT_BY_ID,
                payload: response.data
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