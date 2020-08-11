import React from "react";
import { connect } from "react-redux";
import { Label, List } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { getActiveItem } from "../../redux/selectors";
import { ContextForMaping } from "./CreateContext";
import Redirection from "../Redirection";

const Species = ({ activeItem }) => {
  const arrForItems = [
    "name",
    "classification",
    "designation",
    "average_lifespan",
    "skin_colors",
    "hair_colors",
    "eye_colors",
    "language",
  ];
  const arrForList = ["homeworld", "films", "people"];

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
      ))}
    </List>
  );
};

export default connect((state) => ({
  activeItem: getActiveItem(state),
}))(Species);
