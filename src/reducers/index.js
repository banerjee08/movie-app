import { combineReducers } from 'redux';

import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT
} from '../actions';

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = initialMoviesState, action) {
  console.log('MOVIES REDUCER');
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    default:
      return state;
  }
};

const initialSearchState = {
  result: {},
};

export function search(state = initialSearchState, action) {
  // ADD_SEARCH_RESULT
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie
      }
    default:
      return state;
  }
}

const initialRootState = {
  movies: initialMoviesState,
  search: initialSearchState,
};

// export default function rootReducer(state = initialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

// the above function has a built-in function in redux in the name of combineReducers()
export default combineReducers({
  movies: movies,
  search: search
})

function sum(a,b){
  return a+b;
}
console.log(sum(5,6));

function curriedSum(a){
  return function(b){
    return a+b;
  }
}
console.log(curriedSum(5)(7));