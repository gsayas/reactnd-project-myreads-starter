import React from 'react'
import Book from './Book.js'
import PropTypes from "prop-types";
import sortBy from 'sort-by'

class Bookshelf extends React.Component {
  static propTypes = {
    library: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired
  }

  render() {
    const {title, shelfName, library, onUpdateShelf} = this.props;

    //filter the books that are on the desired Shelf
    const books = library.filter((book) => book.shelf === shelfName);
    // sort books by title
    books.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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

export default Bookshelf