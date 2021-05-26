import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from "redux";
import latestRates from "./Store/GetRatesReducer";
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) =>{
    return createStore(latestRates,initialState,composeEnhancers(applyMiddleware(thunk)))
}

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
, 
document.getElementById('root'));
