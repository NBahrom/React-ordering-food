import Modal from "./UI/Modal";
import CartContext from "../storage/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import UserProgressContext from "../storage/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userPrCtx = useContext(UserProgressContext)
    let cartTotal = 0

    if(cartCtx.items.length > 0){
        cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price,
            0
        )
    }
    
    function handleCloseCart() {
        userPrCtx.hideCart()
    }

    function handleShowCheckout() {
        userPrCtx.showCheckout()
    }

    return <Modal className="cart" open={userPrCtx.progress === 'cart'} modalClose={userPrCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => (
                <CartItem key={item.id} {...item}
                 onDecrase={() => cartCtx.removeItem(item.id)}
                 onIncrease={() => cartCtx.addItem(item)}></CartItem>
            ))}
        </ul>

        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <button onClick={handleCloseCart}> Close</button>
            {cartCtx.items.length > 0 ? (<button onClick={handleShowCheckout}>Go to checkout</button>) : null}
        </p>
    </Modal>
}