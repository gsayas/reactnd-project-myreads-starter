import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types";
import sortBy from 'sort-by'

class Search extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    results: []
  }


  // Whenever the query field is updated this function
  // gets called. Then the 'results' array in the state is updated
  // with the response from BooksAPI.search().
  // If the query field is empty then the array is cleaned.
  updateQuery = (query) => {
    if(query){
      BooksAPI.search(query.trim(), 0).then((results) => {
        this.setState({results: results})
      })
    }else{
      this.setState({results: []})
    }
  };

  render() {
    const {results} = this.state;
    const {onUpdateShelf, myBooks} = this.props;

    let showingBooks = [];
    let myBook;

    //add current shelf to each one of the resulting books
    //I added a try/catch block to protect the user from
    //seeing nasty errors because of unexpected responses from the search API
    try {
      //Check that the results is an array to avoid TypeCast erors
      //for example, when putting a string like "sdfsdfsdfsdfsdfsdfwef" in the query
      // the search function of the API would return an error object instead of an empty array
      if (results && Array.isArray(results))
        showingBooks = results.map( book => {
          myBook = myBooks.find(b => b.id === book.id)
          if (myBook) {
            book.shelf = myBook.shelf
          }
          return book
        });
    }catch(ex){
      console.log(ex);
      console.log(results);
    }

    // sort books by title
    showingBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text"
                   placeholder="Search by title or author"
                   onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateShelf={onUpdateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )

  }

}

export default Search