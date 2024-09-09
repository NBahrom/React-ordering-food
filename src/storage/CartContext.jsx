import {  createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        )

        const updateItems = [...state.items]

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };

            updateItems[existingCartItemIndex] = updatedItem;
        }else{
            updateItems.push({...action.item, quantity: 1})
        }

        return { ...state , items: updateItems}
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        
        const existingCartItem = state.items[existingCartItemIndex]
        const updateItems = [...state.items]

        if(existingCartItem.quantity === 1){
            updateItems.splice(existingCartItemIndex , 1)    
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };

            updateItems[existingCartItemIndex] = updatedItem
        }
        
        return {...state, items: updateItems }
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []}
    }

    return state
}

export function CartContextProvider ({children}) {
    const [cart , dispatchCart] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCart({type: 'ADD_ITEM', item})
    }

    function removeItem(id) {
        dispatchCart({type: 'REMOVE_ITEM', id})
    }
    
    function clearCart() {
        dispatchCart({type: 'CLEAR_CART'})
    }

    const CartContext2 = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    }

    // console.log(CartContext2)

    return  <CartContext.Provider value={CartContext2}>{children}</CartContext.Provider>    
}

export default CartContext;