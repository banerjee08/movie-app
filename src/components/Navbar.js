import React from 'react';
// import { data } from '../actions';
import { addMovieToList, handleMovieSearch } from '../actions';
import { connect, StoreContext } from '../index'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showSearchResults: true
      searchText: '',
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie))
    this.setState({
      showSearchResults: false
    })
  }

  handleSearch = () => {
    const { searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    // const { showSearchResults } = this.state;
    console.log('this.props', this.props);
    const { result, showSearchResults } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{result.Title}</span>
                  <button onClick={() => this.handleAddToMovies(result)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch={ store.dispatch } search={ this.props.search} /> }
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps({search}){
  return{
    search
  }
}
export default connect(mapStateToProps)(Navbar);
