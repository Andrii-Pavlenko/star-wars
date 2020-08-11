import React from "react";
import { connect } from "react-redux";
import { Loader, Input, Button, Item } from "semantic-ui-react";

import { setActiveItem, search, sort } from "../redux/actions";
import {
  getTexts,
  getTextLoading,
  getTextLoadingError,
  getActiveItem,
} from "../redux/selectors";

const MainList = ({
  list,
  setActiveItem,
  loading,
  loadingError,
  search,
  sort,
}) => {
  function mapMainList(list) {
    if (!list.length) {
      return (
        <div className="main-list__no-data">
          No data yet! Please click something on Side Bar.
        </div>
      );
    }
    return (
      <div className="main-list__container">
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          onChange={(e) => search(e.target.value)}
        />
        <Item.Group relaxed="very" className="main-list__small-container">
          {list.map((item) => {
            return (
              <Item
                className="main-list__with-data"
                key={item.id}
                onClick={() => setActiveItem(item)}
              >
                <Item.Content verticalAlign="middle">
                  <Item.Header as="a">
                    {item.name ? item.name : item.title}
                  </Item.Header>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
        <Button
          icon="sort"
          className="main-list__sort"
          onClick={() => sort()}
        ></Button>
      </div>
    );
  }
  if (loadingError) {
    return (
      <div className="main-list__no-data error">
        Something went wrong, please try again later.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="main-list__no-data">
        <Loader active content="Loading..." />
      </div>
    );
  }

  return <div className="main-list">{mapMainList(list)}</div>;
};

export default connect(
  (state) => ({
    list: getTexts(state),
    loading: getTextLoading(state),
    loadingError: getTextLoadingError(state),
    activeItem: getActiveItem(state),
  }),
  (dispatch) => ({
    setActiveItem: (activeItem) => {
      dispatch(setActiveItem(activeItem));
    },
    search: (value) => dispatch(search(value)),
    sort: () => dispatch(sort()),
  })
)(MainList);
