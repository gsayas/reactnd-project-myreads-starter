import React from 'react'
import Book from './Book.js'
import PropTypes from "prop-types";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const {title, books, onUpdateShelf} = this.props

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