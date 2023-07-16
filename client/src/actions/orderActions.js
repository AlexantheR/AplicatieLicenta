import axios from 'axios'
import { toast } from 'react-toastify';

export const placeOrderCard = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        const response = await axios.post('/api/orders/placeorder/card', {
            token,
            subtotal,
            currentUser,
            cartItems,
        });
        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        console.log(response);
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED' });
        console.log(error);
    }
};

export const placeOrderRamburs = (orderDetails) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        const response = await axios.post('/api/orders/placeorder/cash', {
            token: orderDetails.token,
            subtotal: orderDetails.subtotal,
            currentUser: currentUser, // Pass currentUser as an individual parameter
            cartItems: cartItems, // Pass cartItems as an individual parameter
        });
        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        console.log(response);
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED' });
        console.log(error);
    }
};

// export const placeOrder = (token, subtotal) => async (dispatch) => {
//     dispatch({ type: 'PLACE_ORDER_REQUEST' });

//     try {
//         const response = await axios.post('/api/orders/placeorder', {
//             token,
//             subtotal,
//         });

//         dispatch({ type: 'PLACE_ORDER_SUCCESS' });
//         console.log(response.data);
//     } catch (error) {
//         dispatch({ type: 'PLACE_ORDER_FAILED' });
//         console.log(error);
//     }
// };


export const getUserOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: "GET_USER_ORDERS_REQUEST" });

    try {
        const response = await axios.post("/api/orders/getuserorders", { userid: currentUser._id });

        console.log(response);

        dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
    }
};

export const getAllOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_ALL_ORDERS_REQUEST' })

    try {
        const response = await axios.get('/api/orders/getallorders')
        console.log(response)
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ALLORDERS_FAILED', payload: error })
    }
}


export const deliverOrder = (orderid) => async dispatch => {

    try {
        const response = await axios.post('/api/orders/deliverorder', { orderid })
        console.log(response)
        toast.success('Comanda trimisa', {
            position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
        })

        const orders = await axios.get('/api/orders/getallorders')
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: orders.data })
    } catch (error) {
        console.log(error)
    }
}

export const cancelOrder = (orderid) => async (dispatch) => {
    try {
        const response = await axios.post('/api/orders/cancelorder', { orderid });
        console.log(response);
        toast.success('Comanda anulata', {
            position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
        });

        const orders = await axios.get('/api/orders/getallorders');
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: orders.data });
    } catch (error) {
        console.log(error);
    }
};

