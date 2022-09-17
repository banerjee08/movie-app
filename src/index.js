import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
// import { createStore } from 'redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers';
// import thunk from 'redux-thunk';
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
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // my middlware
  console.log('ACTION', action);
  next(action);
};

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    action(dispatch);
    return;
  }
  next(action);
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);

export const StoreContext = createContext();
console.log('StoreContext', StoreContext);

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

// const connectedAppComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              return <ConnectedComponent store={store} />;
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StoreContext.Provider value={store}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </StoreContext.Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
