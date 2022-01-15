import { Dispatch } from "react"
import { ApartmentPageActionTypes, ApartmentAction, IApartment } from "./types"
import http from "../../../http_comon"
import { ISearch } from "../types"
import qs from "qs"



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