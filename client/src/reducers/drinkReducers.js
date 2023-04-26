export const getAllDrinksReducer = (state = { drinks: [] }, action) => {
    switch (action.type) {
        case 'GET_DRINKS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_DRINKS_SUCCESS': return {
            loading: false,
            drinks: action.payload
        }
        case 'GET_DRINKS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}

export const getDrinkByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_DRINKBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_DRINKBYID_SUCCESS': return {
            loading: false,
            drink: action.payload
        }
        case 'GET_DRINKBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const addDrinkReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ADD_DRINK_REQUEST': return {
            loading: true,
            ...state
        }
        case 'ADD_DRINK_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'ADD_DRINK_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const editDrinkReducer = (state = {}, action) => {
    
        switch (action.type) {
            case 'EDIT_DRINK_REQUEST': return {
                loading: true,
                ...state
            }
            case 'EDIT_DRINK_SUCCESS': return {
                loading: false,
                success: true,
            }
            case 'EDIT_DRINK_FAILED': return {
                error: action.payload,
                loading: false
            }
            default: return state
        }
    
    }