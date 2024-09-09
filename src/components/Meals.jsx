import { useContext} from "react"
import { currencyFormatter } from "../util/formatter"
import CartContext from "../storage/CartContext"
import useHttp from "../hooks/useHttp"
import Error from "./Erorr"

const initialConfig = {}

export default function Meals() {
    const cartCtx = useContext(CartContext)

    const {data: loadedMeals, isLoading , error} = useHttp('http://localhost:3000/meals', initialConfig, [])

    
    function handleAddToCart(meal) {
      cartCtx.addItem(meal)
    }
   
    if(error){
      return <Error title="failed to detch meals" message={error}/>
    }
    
    if(isLoading){
      return <p>Fetching meals...</p>
    }
  
    return(
        <div id="meals">
          {
          loadedMeals.map(meal => {
            return(
              <div key={meal.id} className="meal-item">
                <article>
                  <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                  <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                    {currencyFormatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">
                      {meal.description}
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button onClick={() => handleAddToCart(meal)}>
                      Add to cart
                    </button>
                  </p>
                  
                </article>
              </div>
            )
          })}
          
      </div>
    )
}