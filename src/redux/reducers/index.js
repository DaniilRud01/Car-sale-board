import { createStore, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import carsReducer from './cars'

export let store = createStore(carsReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

