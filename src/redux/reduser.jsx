import { TEXT_ACTIONS } from "./actions";
import { v4 as uuid } from "uuid";

const initialState = {
  list: [],
  loadingError: false,
  loading: false,

  activeButton: "",
  activeItem: "",

  sortDirection: true,
  redirectionUrl: "",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TEXT_ACTIONS.POPULATE:
      return {
        ...state,
        list: action.payload.map((item) => ({
          ...item,
          id: uuid(),
          active: state.activeButton,
        })),
        activeItem: "",
      };

    case TEXT_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload,
      };

    case TEXT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case TEXT_ACTIONS.SET_ACTIVE_BUTTON:
      return {
        ...state,
        activeButton: action.payload,
      };

    case TEXT_ACTIONS.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };

    case TEXT_ACTIONS.SET_REDIRECTION_URL:
      return {
        ...state,
        redirectionUrl: action.payload,
      };

    case TEXT_ACTIONS.SEARCH: {
      return {
        ...state,
        activeItem: "",
        list: state.list.filter((item) =>
          item.title
            ? item.title.toLowerCase().includes(action.payload.toLowerCase())
            : item.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    }

    case TEXT_ACTIONS.SORT: {
      return {
        ...state,
        sortDirection: !state.sortDirection,
        list: state.list
          .slice()
          .sort((a, b) =>
            state.sortDirection
              ? a.title
                ? a.title.localeCompare(b.title)
                : a.name.localeCompare(b.name)
              : a.title
              ? b.title.localeCompare(a.title)
              : b.name.localeCompare(a.name)
          ),
      };
    }

    default:
      return state;
  }
}
