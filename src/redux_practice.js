const {createStore} = require("redux")
// state
const initialCounterState = {
    count: 0,
}

const intialUsersState = {
    user:["Monsur"],
    count:1
}
// action
const incrementCounter = () =>{
    return {
        type: "INCREMENT",
    }
}

const decrementConunter = () => {
    return {
        type: "DECREMENT",
    }
}

const resetConunter = () => {
    return {
        type: "RESET",
    }
}

const incrementCounterByValue = (value) =>{
    return {
        type: "INCREMENTBYVALUE",
        payload: value
    }
}

const adduser = (value) =>{
    return {
        type: "ADDUSER",
        payload: value
    }
}


// create reducer
const counterReducer = (state = initialCounterState, action) =>{
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count:state.count + 1
            }
        case "DECREMENT":
            return {
                ...state,
                count:state.count - 1
            }
        case "RESET":
            return {
                ...state,
                count: 0
            }
        case "INCREMENTBYVALUE":
            return {
                ...state,
                count: state.count + action.payload
            }
        default:
            break;
    }
}

//userReducer
const userReducer = (state = intialUsersState, action) =>{
    switch (action.type) {
        case "ADDUSER":
            return {
                user:[...state.user,action.payload],
                count: state.count + 1
            }
        default:
            break;
    }
}
//store
// const store = createStore(counterReducer);
// user store
const store = createStore(userReducer);

store.subscribe(()=>{
    console.log(store.getState())
})

//dispatch action
// store.dispatch(incrementCounter())
// store.dispatch(incrementCounter())
// store.dispatch(incrementCounter())
// store.dispatch(decrementConunter())
// store.dispatch(resetConunter())
// store.dispatch(incrementCounterByValue(5))
store.dispatch(adduser("shafiq"))