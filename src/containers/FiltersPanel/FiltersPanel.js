import React, { useState } from "react";
import "./FiltersPanel.scss";
import { connect } from "react-redux";

import Checkbox from "../../components/UI/Checkbox/Checkbox";
// import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Preloader from "../../components/UI/Preloader/Preloader";
import Range from "../../components/UI/Range/Range";

import * as actions from "../../store/actions/index";

const FiltersPanel = props => {
  const [activeGenres, setSelectGenres] = useState([]);
  // const [search, setSearch] = useState("");
  const [years, setYears] = useState({ min: 1990, max: 2019 });
  const [rating, setRating] = useState({ min: 0.5, max: 10 });

  const handleCheckboxChange = event => {
    const value = +event.target.value;
    const genres = [...activeGenres];
    const index = activeGenres.indexOf(value);
    const isSelected = index !== -1;

    if (isSelected) {
      genres.splice(index, 1);
    } else {
      genres.push(value);
    }

    setSelectGenres(genres);
  };

  // const onSearchChange = event => {
  //   setSearch(event.target.value);
  // };

  let genreOutput = null;

  if (props.genres.length) {
    const genresList = props.genres.map(genre => {
      const checked = activeGenres.indexOf(genre.id) !== -1;

      return (
        <React.Fragment key={genre.id}>
          <Checkbox
            name="genre"
            value={genre.id}
            checked={checked}
            label={genre.name}
            onChange={handleCheckboxChange}
          />
        </React.Fragment>
      );
    });

    genreOutput = (
      <div className="filters__item filters__item--checkboxes">
        <div className="filters__name">Genre:</div>
        <div className="filters__checkboxes">{genresList}</div>
      </div>
    );
  }

  const onFormSubmit = event => {
    event.preventDefault();

    const data = {
      // search: search,
      genres: activeGenres,
      rating: rating,
      years: years
    };

    props.onSubmitHandler(data);
  };

  let filters = <Preloader />;

  if (!props.loading) {
    filters = (
      <form onSubmit={onFormSubmit}>
        {genreOutput}
        <div className="filters__item">
          <div className="filters__name">Rating:</div>
          <div className="filters__input">
            <Range
              maxValue={10}
              step={0.5}
              minValue={0.5}
              value={rating}
              onChange={value => setRating(value)}
            />
          </div>
        </div>
        <div className="filters__item">
          <div className="filters__name">Year:</div>
          <div className="filters__input">
            <Range
              maxValue={2019}
              step={1}
              minValue={1990}
              value={years}
              onChange={value => setYears(value)}
            />
          </div>
        </div>
        {/* <div className="filters__item">
          <div className="filters__name">Search:</div>
          <div className="filters__input">
            <Input
              placeholder="Film name"
              value={search}
              onChange={onSearchChange}
            />
          </div>
        </div> */}
        <Button type="submit">Search</Button>
      </form>
    );
  }

  const classes = ["filters", props.fixed ? "fixed" : ""];

  return <div className={classes.join(" ")}>{filters}</div>;
};

const mapStateToProps = state => {
  return {
    genres: state.filter.genres,
    loading: state.filter.loading,
    error: state.filter.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitHandler: searchData => dispatch(actions.searchMovies(searchData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersPanel);
