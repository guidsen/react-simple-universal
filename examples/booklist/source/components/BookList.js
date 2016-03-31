import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const BookList = ({ dispatch, books }) => {
  const bookNodes = books.items.map(book => {
    return (
      <div key={ book.id }>
        { book.title } - Read by { book.count } people.
        <button onClick={ () => dispatch({ type: 'ADD_COUNT', item: book }) }>Add reader</button>
        <button onClick={ () => dispatch(push(`/book/${book.id}`)) }>View more</button>
      </div>
    );
  });

  return (
    <div>
      <h1>Books</h1>
      { bookNodes }
    </div>
  );
};

BookList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { books } = state;
  return { books };
};

// Connect props to component
export default connect(mapStateToProps)(BookList);
