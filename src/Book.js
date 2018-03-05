import React, { Component } from 'react'
//import PropTypes from 'prop-types'

class Book extends Component {

  render() {
    const { book, onUpdateShelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{width: '100%', height: '100%', backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => onUpdateShelf(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book