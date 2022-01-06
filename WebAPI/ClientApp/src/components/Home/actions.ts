import { Dispatch } from "react"
import { HomeAction, HomeActionTypes, ICountry } from "./types";
import http from "../../http_comon"

export const GetCountries = () => {
    return async (dispatch: Dispatch<HomeAction>) => {
        try {
            let response = await http.get<Array<ICountry>>('api/Country/get-all')
            dispatch({
                type: HomeActionTypes.GET_COUNTRIES,
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