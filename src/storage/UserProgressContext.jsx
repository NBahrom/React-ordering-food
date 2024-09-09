
import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideChekout: () => {}

});

export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart')
    }

    function hideCart() {
        setUserProgress('')
    }

    function showCheckout() {
        setUserProgress('checkout')
    }

    function hideChekout() {
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideChekout
    }

    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}


export default UserProgressContext;