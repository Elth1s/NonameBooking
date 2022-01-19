export enum OrderActionTypes {
    GET_USER_ORDERS = "GET_USER_ORDERS",
    GET_ORDER_BY_ID = "GET_ORDER_BY_ID"
}

export interface IOrderItem {
    id: string,
    start: Date,
    end: Date,
    apartmentId: string,
    apartmentName: string
    orderStatusName: string
    total: number
}

export interface IOrder {
    start: Date | string,
    end: Date | string,
    apartmentId: string,
    apartmentName: string,
    orderStatusName: string,
    address: string | null,
    total: number
}

export interface OrdersState {
    orders: Array<IOrderItem>,
    selectedOrder: IOrder
}

export interface OrderServerError {
    title: string,
    status: number,
    errors: Array<any>,
}

export interface GetOrdersAction {
    type: OrderActionTypes.GET_USER_ORDERS,
    payload: Array<IOrderItem>
}
export interface GetOrderByIdAction {
    type: OrderActionTypes.GET_ORDER_BY_ID,
    payload: IOrder
}

export type OrderAction = GetOrdersAction | GetOrderByIdAction;