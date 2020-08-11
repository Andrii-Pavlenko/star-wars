import React from "react";
import { connect } from "react-redux";
import { Label, List } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { getActiveItem } from "../../redux/selectors";
import { ContextForMaping } from "./CreateContext";
import Redirection from "../Redirection";

const Vehicles = ({ activeItem }) => {
  const arrForItems = [
    "name",
    "cargo_capacity",
    "consumables",
    "cost_in_credits",
    "crew",
    "length",
    "manufacturer",
    "max_atmosphering_speed",
    "model",
    "passengers",
    "vehicle_class",
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
}))(Vehicles);
