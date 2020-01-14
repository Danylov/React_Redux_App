import {createStore, applyMiddleware} from "redux";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk';

//                                  (next)
const  logMiddleware = (store) => (dispatch) => (action) => {
    console.log(action.type, store.getState());
    return  dispatch(action);
};

//                                (next)
const  stringMiddleware = () => (dispatch) => (action) => {
    if (typeof(action) === 'string') {
        return dispatch({
            type : action
        });
    };
    return  dispatch(action);
}

const  logEnhancer = (createStore) => (...args) => {
    const  store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);
        return  originalDispatch(action);
    };
    return store;
}

const  stringEnhancer = (createStore) => (...args) => {
    const  store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof(action) === 'string') {
            return originalDispatch({
                type : action
            })
        }
        return  originalDispatch(action);
    };
    return store;
}

// const  store = createStore(reducer);
// const  store = createStore(reducer, compose(stringEnhancer, logEnhancer));
const  store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

// const delayedAction = (dispatch) => {
// setTimeout(() => dispatch({
//     type : 'DELAYED_ACTION'
// }), 3000);
// }
//
// store.dispatch(delayedAction);
// store.dispatch('HELLO_WORLD');

const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type : 'DELAYED_ACTION'
    }), timeout);
}

store.dispatch(delayedActionCreator(3000));

export  default  store;