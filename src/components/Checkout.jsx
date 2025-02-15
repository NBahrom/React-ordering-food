import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../storage/CartContext"
import { currencyFormatter } from "../util/formatter"
import Input from "./UI/Input"
import UserProgressContext from "../storage/UserProgressContext"
import useHttp from "../hooks/useHttp"
import Error from "./Erorr"

const requestConfig = {
    method: 'POST' ,
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext) 

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp(
        'http://localhost:3000/orders', 
        requestConfig
    )
  
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price,
            0
        )   

    function handleClose() {
        userProgressCtx.hideChekout()
    }

    function handleFinish() {
        userProgressCtx.hideChekout()
        cartCtx.clearCart()
        clearData()
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())
        

        sendRequest(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                },
            })
        )
    }

    let actions = <>
        <button onClick={handleClose}>Close</button>
        <button>Submit Order</button>
    </>

    if(isSending){
        actions = <span>Sending order data... </span>
    }

    if(data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} modalClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>
                We will get back to you with more details via email within the next few minutes.
            </p>
            <p className="modal-actions">
                <button onClick={handleFinish}>Okay</button>
            </p>
        </Modal>
    }
   
    return <Modal open={userProgressCtx.progress === 'checkout'} modalClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type='text' id="name"  />
            <Input label="E-Mail Adress" type='email' id="email"  />
            <Input label="Street" type='text' id="street"  />
            <div className="control-row">
                <Input label="Postal Code" type='text' id="postal-code"  />
                <Input label="City" type='text' id="city"  />
            </div>

            {error && <Error title="Failed to submit order" message={error} />}

            <p className="modal-actions">
               {actions}
            </p>
        </form>
    </Modal>
}