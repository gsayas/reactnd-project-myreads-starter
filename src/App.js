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
    });
  }

  updateShelf = (book, shelf) => {
    let newBook = book
    newBook.shelf = shelf

    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        myBooks: state.myBooks.filter((b) => b.id !== newBook.id).concat([newBook])
      }))
      //TODO: add success message
    })
  };
  
  render() {
    const {myBooks} = this.state;
    
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
                  shelfName='currentlyReading'
                  library={myBooks}
                  onUpdateShelf={this.updateShelf}
                />
                <Bookshelf
                  title='Want to Read'
                  shelfName='wantToRead'
                  library={myBooks}
                  onUpdateShelf={this.updateShelf}
                />
                <Bookshelf
                  title='Read'
                  shelfName='read'
                  library={myBooks}
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
