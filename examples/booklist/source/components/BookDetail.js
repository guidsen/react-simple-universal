import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const BookDetail = ({ dispatch, book }) => {
  return (
    <div>
      <h1>Book Details</h1>
      <div>Title: { book.title } </div>
      <div>Description: { book.description } </div>
      <div>Reader count: { book.count } </div>
      <hr />
      <button onClick={ () => dispatch(push('/')) }>Go back to overview!</button>
    </div>
  );
};

BookDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { books } = state;
  return { book: books.items.filter(book => book.id === ownProps.params.id)[0] };
};

// Connect props to component
export default connect(mapStateToProps)(BookDetail);
