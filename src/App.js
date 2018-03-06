import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    myBooks: [],
    results: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({myBooks: books})
    })
  }

  updateShelf = (book, shelf) => {
    let newBook = book
    newBook.shelf = shelf

    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        myBooks: state.myBooks.filter((b) => b.id !== newBook.id).concat([newBook])
      }))
      // console.log('DBupdated!')
      //TODO: add success message
    })
  }
  
  render() {
    const { myBooks } = this.state
    // console.log('rendering')
    // console.log(this.state.myBooks)
    let currentlyReading, wantToRead, read
    
    currentlyReading = myBooks.filter((book) => book.shelf === 'currentlyReading')
    wantToRead = myBooks.filter((book) => book.shelf === 'wantToRead')
    read = myBooks.filter((book) => book.shelf === 'read')
    
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            onUpdateShelf={this.updateShelf}
            myBooks={myBooks}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  books={currentlyReading}
                  onUpdateShelf={this.updateShelf}
                />
                <Bookshelf
                  title='Want to Read'
                  books={wantToRead}
                  onUpdateShelf={this.updateShelf}
                />
                <Bookshelf
                  title='Read'
                  books={read}
                  onUpdateShelf={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Add a Book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
