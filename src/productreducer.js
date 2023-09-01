const {createStore} = require("redux")

const initial_product = {
    products: ["Rice", "Oil"],
    count: 2
}

const get_product=()=>{
    return {
        type: "GET_PRODUCT"
    }
}

const add_product = (product) => {
    return {
        type: "ADD_PRODUCT",
        payload: product
    }
}

const update_product = (product,newProduct)=>{
    return {
        type: "UPDATE_PRODUCT",
        payload: {
            product,
            newProduct
        }
    }
}
const remove_product = (product) => {
    return {
        type: "REMOVE_PRODUCT",
        payload: product
    }

}

const productReducer=(state = initial_product,action)=>{
    switch (action.type){
        case "GET_PRODUCT":
            return{
                ...state
            }
        case "ADD_PRODUCT":
            return{
                products:[...state.products,action.payload],
                count: state.count+1
            }
        case "UPDATE_PRODUCT":
            const updatedProducts = state.products.map(product => {
                if (product === action.payload.product) {
                    return action.payload.newProduct;
                }
                return product;
            });

            return {
                ...state,
                products: updatedProducts
            };
        case "REMOVE_PRODUCT":
            return {
                products: state.products.filter(product => product !== action.payload),
                count: state.count - 1
            }
        default:
            break
    }
}

const store = createStore(productReducer)

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(get_product())
store.dispatch(add_product("Salt"))
store.dispatch(get_product())
store.dispatch(remove_product("Rice"))
store.dispatch(get_product())
store.dispatch(update_product("Oil","Master Oil"))
store.dispatch(get_product())

