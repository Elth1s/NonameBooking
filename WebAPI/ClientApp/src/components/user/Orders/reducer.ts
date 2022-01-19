import { OrderAction, OrderActionTypes, OrdersState } from "./types";

const initialState: OrdersState = {
    orders: [],
    selectedOrder: {
        start: "",
        end: "",
        address: "",
        apartmentId: "",
        apartmentName: "",
        orderStatusName: "",
        total: 0
    }
}

export const orderReducer = (state = initialState, action: OrderAction): OrdersState => {
    switch (action.type) {
        case OrderActionTypes.GET_USER_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        case OrderActionTypes.GET_ORDER_BY_ID:
            return {
                ...state,
                selectedOrder: action.payload,
            }
        default:
            return state;
    }
}