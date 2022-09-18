import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount() {
    console.log('hello',data);
    this.props.dispatch(addMovies(data));
  }

  isMovieInFavourites = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }

    return false;
  };

  changeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    const { list, showFavourites, favourites } = this.props.movies;
    const { search } = this.props;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieInFavourites(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return{
    movies: state.movies,
    search: state.movies
  }
};
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
