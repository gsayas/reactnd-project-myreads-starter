import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const {book, onUpdateShelf} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{width: '100%', height: '100%', backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf && book.shelf !== 'none' ? book.shelf: 'none'} onChange={(event) => onUpdateShelf(book, event.target.value)}>
              <option value="none" disabled >Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {Array.isArray(book.authors) && book.authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book