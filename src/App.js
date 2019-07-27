import React, { useEffect } from "react";
import { connect } from "react-redux";
import MoviesList from "./containers/MoviesList/MoviesList";
import FiltersPanel from "./containers/FiltersPanel/FiltersPanel";
import AsidePanel from "./containers/AsidePanel/AsidePanel";
import { Route, withRouter, Redirect } from "react-router-dom";

import * as actions from "./store/actions/index";

// import Layout from "./hoc/Layout/Layout";

const App = props => {
  useEffect(() => {
    props.onTryFetchGenre();
  }, []);

  const searching = props.searching ? (
    <Redirect to="/movies" />
  ) : (
    <Redirect to="/" />
  );

  return (
    <div className="App">
      {searching}
      <Route path="/movies" component={MoviesList} />
      <Route path="/movies" component={AsidePanel} />
      <Route path="/" exact component={FiltersPanel} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searching: state.movies.searching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryFetchGenre: () => dispatch(actions.fetchGenre())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
