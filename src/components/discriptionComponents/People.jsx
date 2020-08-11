import React from "react";
import { connect } from "react-redux";
import { Label, List } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { getActiveItem } from "../../redux/selectors";
import { ContextForMaping } from "./CreateContext";
import Redirection from "../Redirection";

const People = ({ activeItem }) => {
  const arrForItems = [
    "name",
    "height",
    "mass",
    "hair_color",
    "skin_color",
    "eye_color",
    "birth_year",
    "gender",
  ];
  const arrForList = ["homeworld", "films", "species", "starships", "vehicles"];

  return (
    <List divided>
      {arrForItems.map((item) => {
        return (
          <List.Item key={item}>
            <Label color="grey" horizontal>
              {item.split("_").join(" ")}:
            </Label>
            {activeItem[item]}
          </List.Item>
        );
      })}
      {arrForList.map((item) => (
        <List.Item key={uuid()}>
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
}))(People);
