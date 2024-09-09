import { currencyFormatter } from "../util/formatter"

export default function CartItem({name, quantity, price, onDecrase, onIncrease}) {
    return(
        <li className="cart-item">
            <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
            <p className="cart-item-actions">
                <button onClick={onDecrase}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}