// order: define state, action and the reducer

const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

//1. defining initial state
const initialState = { 
    loading : false,
    users : [],
    error : ''
}

 // 2. declare the constants for the action types
 const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
 const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
 const FETCH_USERS_FALIURE = 'FETCH_USERS_FALIURE';

 //3. create action creators
 const fetchUsersRequest = () => {
     return {
         type : FETCH_USERS_REQUEST
     }
 }

 const fetchUsersSuccess = users => {
     return {
         type : FETCH_USERS_SUCCESS,
         payload : users
     }
 }

 const fetchUsersFaliure = error => {
     return {
        type : FETCH_USERS_FALIURE,
        payload : error
     }
 }

//4. define the reducer function
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading : false,
                users : action.payload,
                error : ''
            }
        case FETCH_USERS_FALIURE:
            return {
                loading: false,
                users : [],
                error : action.payload
            }
    }
}

//6. define the aysnc action creator
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            // response.data is the array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            //error.message gives the description of the error
            dispatch(fetchUsersFaliure(error.message))
        })
    }
}

//5. create redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})

store.dispatch(fetchUsers())