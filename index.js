//actions only decribes what happened, but does not decribe how the application state changes
//reducer accepts the  state and actions as arguments, and returns the next state of the application
// (previousState, action) => newState
// we need to define the actions and the initial state to define the reducer function
const redux = require('redux')
const combineReducers = redux.combineReducers
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

const buyCake = () => { //action
    return {
    type: BUY_CAKE,
    info: 'Buying cake'
}
}

const buyIceCream = () =>{//action
    return{
        type: BUY_ICECREAM,
        info: 'Buying icecream'
    }
}

const initialCakeState = {//inital state
    numOfCakes: 10
}

const initialIceCreamState = {//initial state
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) =>{
    switch(action.type){
        case BUY_CAKE : return {
            ...state, 
            numOfCakes : state.numOfCakes - 1
        } 
        default : return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) =>{
    switch(action.type){
        case BUY_ICECREAM : return {
            ...state,
            numOfIceCreams : state.numOfIceCreams - 1
        }
        default : return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream : iceCreamReducer
})
const store = createStore(rootReducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()