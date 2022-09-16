import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createStore } from 'redux';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit'

// curried function of:
// function logger(obj, next, action)
// redux will be doing something like logger(obj)(next)(action)
// const logger = function ({ dispatch, getState }){
//   return function (next){
//     return function (action){
//       // middleware code
//       console.log('ACTION_TYPE: ', action.type);
//       next(action)
//     }
//   }
// }

// another way of writing the middleware logger function
const logger = ({dispatch, getState}) => (next) => (action) => {
  if(typeof action !== 'function')
{
  console.log('ACTION_TYPE: ', action.type);
}  
  next(action)
}

// const thunk =  ({dispatch, getState}) => (next) => (action) => {
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }


const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
