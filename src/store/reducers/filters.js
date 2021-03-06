import * as actionTypes from "../actions/actionTypes";

const initState = {
  genres: [],
  loading: true,
  error: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENRE: {
      return {
        ...state
      };
    }

    case actionTypes.FETCH_GENRE_START: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }

    case actionTypes.FETCH_GENRE_SUCCESS: {
      return {
        ...state,
        genres: action.data.genres,
        loading: false,
        error: false
      };
    }

    case actionTypes.FETCH_GENRE_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    default:
      return state;
  }
};

export default reducer;
