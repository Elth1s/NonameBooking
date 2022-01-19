import { Dispatch } from "react"
import { OrderActionTypes, OrderAction, IOrderItem, IOrder, OrderServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetOrders = (id: string) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try {
            let response = await http.get<Array<IOrderItem>>(`api/Order/get-by-user-id/${id}`)
            dispatch({
                type: OrderActionTypes.GET_USER_ORDERS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<OrderServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const CancelOrder = (id: string) => {
    return async () => {
        try {
            await http.put(`api/Order/edit-status-to-canceled/${id}`);
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<OrderServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}

export const GetOrder = (id: string) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try {
            let response = await http.get<IOrder>(`api/Order/get-by-id/${id}`);
            const data = response.data;
            dispatch({
                type: OrderActionTypes.GET_ORDER_BY_ID,
                payload: data,
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<OrderServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
