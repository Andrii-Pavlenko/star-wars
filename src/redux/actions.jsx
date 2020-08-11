import axios from "axios";

export const TEXT_ACTIONS = {
  POPULATE: "POPULATE",
  SET_LOADING_ERROR: "SET_LOADING_ERROR",
  SET_LOADING: "SET_LOADING",

  SET_ACTIVE_BUTTON: "SET_ACTIVE_BUTTON",
  SET_ACTIVE_ITEM: "SET_ACTIVE_ITEM",

  SORT: "SORT",
  SEARCH: "SEARCH",
  SET_REDIRECTION_URL: "SET_REDIRECTION_URL",
};

export function populate(texts) {
  return {
    type: TEXT_ACTIONS.POPULATE,
    payload: texts,
  };
}

export function setActiveButton(button) {
  return {
    type: TEXT_ACTIONS.SET_ACTIVE_BUTTON,
    payload: button,
  };
}

export function setRedirectionUrl(url) {
  return {
    type: TEXT_ACTIONS.SET_REDIRECTION_URL,
    payload: url,
  };
}

export function setActiveItem(item) {
  return {
    type: TEXT_ACTIONS.SET_ACTIVE_ITEM,
    payload: item,
  };
}

export function search(value) {
  return {
    type: TEXT_ACTIONS.SEARCH,
    payload: value,
  };
}

export function sort() {
  return {
    type: TEXT_ACTIONS.SORT,
  };
}

function setLoadingError(error) {
  return {
    type: TEXT_ACTIONS.SET_LOADING_ERROR,
    payload: error,
  };
}

function setLoading(loading) {
  return {
    type: TEXT_ACTIONS.SET_LOADING,
    payload: loading,
  };
}

export function loadTexts(activeButton) {
  return async (dispatch) => {
    dispatch(setLoadingError(false));
    dispatch(setLoading(true));
    let success = false;
    let people = [];
    axios(`https://swapi.dev/api/${activeButton}/`)
      .then((response) => {
        // collect people from first page
        people = response.data.results;
        return response.data.count;
      })
      .then((count) => {
        // exclude the first request
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        // start at 2 as you already queried the first page
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(
            axios(`https://swapi.dev/api/${activeButton}/?page=${i}`)
          ); // problems with API
        }
        return Promise.all(promises);
      })
      .then((response) => {
        //get the rest records - pages 2 through n.
        people = response.reduce(
          (acc, data) => [...acc, ...data.data.results],
          people
        );
        dispatch(populate(people));
        success = true;
      })
      .finally(() => {
        dispatch(setLoading(false));
        if (!success) {
          dispatch(setLoadingError(true));
        }
      });
  };
}
