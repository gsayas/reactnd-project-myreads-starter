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

    /*reading: [{
      id: "6",
      title: "Ender's Game",
      authors: "Orson Scott Card",
      imageLinks: {
        thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      }
    },
      {
        id: "5",
        title: "Ender's Game2",
        authors: "Orson Scott Card",
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
        }
    }],

    wantRead: [{
      id: "2",
      title: "The Hobbit",
      authors: "J.R.R Tolkien",
      imageLinks: {
        thumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
      }
    },
    {
      id: "1",
      title: "Ender's Game2",
      authors: "Orson Scott Card",
      imageLinks: {
      thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      }
    }],

    read: [{
      id: "3",
      title: "1776",
      authors: "David McCullough",
      imageLinks: {
        thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
      }
    },
    {
      id: "4",
      title: "Ender's Game2",
      authors: "Orson Scott Card",
      imageLinks: {
      thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      }
    }]*/
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({myBooks: books})
    })
  }

  updateShelf = (book, shelf) => {
    console.log(book)
    console.log(shelf)
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
    // console.log('rendering')
    // console.log(this.state.myBooks)
    let currentlyReading, wantToRead, read
    let library = this.state.myBooks
    
    currentlyReading = library.filter((book) => book.shelf === 'currentlyReading')
    wantToRead = library.filter((book) => book.shelf === 'wantToRead')
    read = library.filter((book) => book.shelf === 'read')
    
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            onUpdateShelf={this.updateShelf}
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
