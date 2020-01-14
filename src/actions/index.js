
const booksRequested = (newBooks) => {
    return {
        type    : 'FETCH_BOOKS_REQUEST'
    };
};

const booksLoaded = (newBooks) => {
    return {
        type    : 'FETCH_BOOKS_SUCCESS',
        payload : newBooks
    };
};

const booksError = (error) => {
    return {
        type    : 'FETCH_BOOKS_FAILURE',
        payload : error
    };
};

export const bookAddedToCart = (bookId) => {
return {
    type : 'BOOK_ADDED_TO_CARD',
    payload : bookId
}
}

export const bookRemovedFromCart = (bookId) => {
    return {
        type : 'BOOK_REMOVED_FROM_CARD',
        payload : bookId
    }
}

export const allBooksRemovedFromCart = (bookId) => {
    return {
        type : 'ALL_BOOKS_REMOVED_FROM_CARD',
        payload : bookId
    }
}
const  fetchBooksOld = (bookstoreService, dispatch) => () => {
    // 1. Receive  data
    dispatch(booksRequested());
    bookstoreService.getBooks()
        // 2. Dispatch  action  to  store
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
}

// For work with Thunk
const  fetchBooks = (bookstoreService) => () => (dispatch) => {
// 1. Receive  data
    dispatch(booksRequested());
    bookstoreService.getBooks()
        // 2. Dispatch  action  to  store
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
}

export {
    fetchBooks
};