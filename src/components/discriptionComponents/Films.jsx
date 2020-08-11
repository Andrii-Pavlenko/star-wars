import React from "react";
import { connect } from "react-redux";
import { Label, List } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { getActiveItem } from "../../redux/selectors";
import Redirection from "../Redirection";
import { ContextForMaping } from "./CreateContext";

const Films = ({ activeItem }) => {
  const arrForItems = [
    "title",
    "director",
    "producer",
    "release_date",
    "opening_crawl",
  ];
  const arrForList = [
    "characters",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];

  return (
    <List divided>
      {arrForItems.map((item) => {
        return (
          <List.Item key={uuid()}>
            <Label color="grey" horizontal>
              {item.split("_").join(" ")}:
            </Label>
            {activeItem[item]}
          </List.Item>
        );
      })}
      {arrForList.map((item) => (
        <List.Item key={item}>
          <ContextForMaping.Provider value={item}>
            <Redirection />
          </ContextForMaping.Provider>
        </List.Item>
      ))}{" "}
    </List>
  );
};

export default connect((state) => ({
  activeItem: getActiveItem(state),
}))(Films);
