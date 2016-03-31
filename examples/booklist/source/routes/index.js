import React from 'react';
import { Router, Route } from 'react-router';
import BookList from 'components/BookList';
import BookDetail from 'components/BookDetail';

export default (browserHistory) => {
  return (
    <Router history={ browserHistory }>
      <Route path="/" component={ BookList } />
      <Route path="/book/:id" component={ BookDetail } />
    </Router>
  );
};
