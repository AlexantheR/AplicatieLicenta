export const addToCart = (pizza, quantity, variant) => (dispatch, getState) => {

    var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        variant: variant,
        quantity: Number(quantity),
        prices: pizza.prices,
        price: pizza.prices[0][variant] * quantity
    }

    if (cartItem.quantity > 10) {
        alert("You can not add more than 10 pizzas!")
    }

    else {
        if (cartItem.quantity <= 0) {
            dispatch({ type: 'DELETE_FROM_CART', payload: pizza })
        }
        else {
            dispatch({ type: 'ADD_TO_CART', payload: cartItem })
        }

    }

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

}

export const deleteFromCart = (pizza) => (dispatch, getState) => {

    dispatch({ type: 'DELETE_FROM_CART', payload: pizza })
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}




export const addToDrinksCart = (drink, quantity) => (dispatch, getState) => {
    
        var cartItem = {
            name: drink.name,
            _id: drink._id,
            quantity: Number(quantity),
            prices : drink.prices,
            price: drink.prices[0] * quantity
        }
    
        if (cartItem.quantity > 20) {
            alert("You can not add more than 20 drinks!")
        }
    
        else {
            if (cartItem.quantity <= 0) {
                dispatch({ type: 'DELETE_FROM_CART', payload: drink })
            }
            else {
                dispatch({ type: 'ADD_TO_CART', payload: cartItem })
            }
    
        }
    
        const cartItems = getState().cartReducer.cartItems
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    
    }

    export const deleteDrinkFromCart = (drink) => (dispatch, getState) => {

        dispatch({ type: 'DELETE_FROM_CART', payload: drink })
        const cartItems = getState().cartReducer.cartItems
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }