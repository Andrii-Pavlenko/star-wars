import React from "react";
import { connect } from "react-redux";
import { Label, List } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { getActiveItem } from "../../redux/selectors";
import { ContextForMaping } from "./CreateContext";
import Redirection from "../Redirection";

const Starships = ({ activeItem }) => {
  const arrForItems = [
    "name",
    "model",
    "manufacturer",
    "cost_in_credits",
    "length",
    "max_atmosphering_speed",
    "crew",
    "passengers",
    "cargo_capacity",
    "consumables",
    "hyperdrive_rating",
    "MGLT",
    "starship_class",
  ];
  const arrForList = ["films", "pilots"];

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
}))(Starships);
