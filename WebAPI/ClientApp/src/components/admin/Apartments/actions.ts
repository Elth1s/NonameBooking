import { Dispatch } from "react"
import { ApartmentAction, AdminApartmentsActionTypes, IApartmentItem, ApartmentServerError } from "./types";
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";

export const GetAdminApartments = () => {
    return async (dispatch: Dispatch<ApartmentAction>) => {
        try {
            let response = await http.get<Array<IApartmentItem>>('api/Apartment/get-all')
            dispatch({
                type: AdminApartmentsActionTypes.GET_ADMIN_APARTMENTS,
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
