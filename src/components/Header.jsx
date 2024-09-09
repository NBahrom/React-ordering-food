import { useContext } from 'react'
import Logo from '../../src/assets/logo.jpg'
import CartContext from '../storage/CartContext'
import UserProgressContext from '../storage/UserProgressContext'

export default function Header() {
    const cartCtx = useContext(CartContext)
    const userPrCtx = useContext(UserProgressContext)

    let cartQuantity = 0
    cartCtx.items.forEach(item => {
        cartQuantity += item.quantity
    })
    
    function handleShowCart() {
        userPrCtx.showCart()
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt={Logo} />
                <h1>REACTFOOD</h1>
            </div>

            <button onClick={handleShowCart}>
                Cart({cartQuantity})
            </button>

      </header>
    )
}