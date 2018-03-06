import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types";

class Search extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    results: []
  }

  updateQuery = (query) => {
    if(query){
      BooksAPI.search(query.trim(), 0).then((results) => {
        this.setState({ results: results })
      })
    }else{
      this.setState({ results: [] })
    }
  }

  render() {
    const { results } = this.state
    const { onUpdateShelf, myBooks } = this.props

    let showingBooks = []
    let myBook

    // add current shelf to each one of the resulting books
    try {
      if (results && Array.isArray(results))
        showingBooks = results.map((book) => {
          myBook = myBooks.find(b => b.id === book.id)
          if (myBook) {
            book.shelf = myBook.shelf
          }
          return book
        })
    }catch(ex){
      console.log(ex)
      console.log(results)
    }

    // showingBooks.sort(sortBy('title'))

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