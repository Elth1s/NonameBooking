import { Dispatch } from "react"
import { ApartmentPageActionTypes, ApartmentAction, IApartment, IBestImage, IDateRange } from "./types"
import http from "../../../http_comon"

import { baseURL } from "../../../http_comon"
import axios, { AxiosError } from "axios"

export const getNewImages = (images: Array<string>) => {
    let bestImages = [] as Array<IBestImage>;
    switch (images.length) {
        case 5:
            bestImages = [{ img: "", cols: 2, rows: 2 }, { img: "" }, { img: "", cols: 2 }, { img: "", cols: 2 }, { img: "" }]
            break;
        case 4:
            bestImages = [{ img: "", cols: 3, rows: 2 }, { img: "", cols: 2 }, { img: "" }, { img: "" }]
            break;
        case 3:
            bestImages = [{ img: "", cols: 3, rows: 2 }, { img: "", cols: 2 }, { img: "", cols: 2 }]
            break;
        case 2:
            bestImages = [{ img: "", cols: 3, rows: 2 }, { img: "", cols: 2, rows: 2 }]
            break;
        default:
            bestImages = [{ img: "", cols: 5, rows: 2 }]
            break;
    }
    if (images.length === 0)
        bestImages[0].img = "";
    else
        for (let i = 0; i < images.length; i++) {
            bestImages[i].img = baseURL + images[i];
        }
    return bestImages
}


export const GetApartment = (id: string) => {
    return async (dispatch: Dispatch<ApartmentAction>) => {
        try {
            let response = await http.get<IApartment>(`api/Apartment/get-by-id/${id}`)
            dispatch({
                type: ApartmentPageActionTypes.GET_APARTMENT,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            // if (axios.isAxiosError(error)) {
            //     const serverError = error as AxiosError<LoginServerError>;
            //     if (serverError && serverError.response) {
            //         serverError.response.data.status = serverError.response.status;
            //         return Promise.reject(serverError.response.data);
            //     }
            // }
            return Promise.reject(error)
        }
    }
}

export const Reserve = (dateRange: IDateRange, totalPrice: number, userId: string, apartmentId: number) => {
    return async () => {
        try {
            let start = new Date(dateRange.start.getTime() - (dateRange.start.getTimezoneOffset() * 60000)).toISOString();
            let end = new Date(dateRange.end.getTime() - (dateRange.end.getTimezoneOffset() * 60000)).toISOString();
            await http.post('api/Order/create', { Start: start, End: end, Total: totalPrice, UserId: userId, ApartmentId: apartmentId, OrderStatusId: 1 })
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    // serverError.response.data.errors = serverError.response.;
                    console.log(serverError)
                    console.log(serverError.response)
                    console.log(serverError.response.data)
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}