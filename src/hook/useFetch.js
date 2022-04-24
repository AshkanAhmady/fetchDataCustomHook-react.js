import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  error: null,
  loading: false,
  data: null,
};

const actions = {
  fetchRequest: "FETCH_REQUEST",
  fetchSuccess: "FETCH_SUCCESS",
  fetchFaliur: "FETCH_FALIUR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchRequest:
      return { ...state, loading: true, error: null, data: null };
    case actions.fetchSuccess:
      return { ...state, loading: false, error: null, data: action.payload };
    case actions.fetchFaliur:
      return { ...state, loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.fetchRequest });
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: actions.fetchSuccess, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actions.fetchFaliur, payload: error.message });
      });
  }, [url]);

  return state;
};

export default useFetch;
