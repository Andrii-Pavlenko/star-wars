import React from "react";
import { Icon } from "semantic-ui-react";
import { Image } from 'semantic-ui-react'
import { connect } from "react-redux";
import halmet from "../images/favicon.png";
import { loadTexts, setActiveButton, setActiveItem } from "../redux/actions";
import { getTexts, getActiveButton } from "../redux/selectors";

export const setValueToButtons = [
  ["users", "people"],
  ["world", "planets"],
  ["film", "films"],
  ["star", "species"],
  ["car", "vehicles"],
  ["space shuttle", "starships"],
];

const SideBar = ({ load, activeButton, setActiveButton, setActiveItem }) => {
  function getResponse(button) {
    let setButton = button.getAttribute("value");
    setActiveButton(setButton);
    load(setButton);
    setActiveItem();
  }

  return (
    <aside className="side-bar">
      <Image src={halmet} size='medium' rounded />
      <div className="side-bar__button-container">
        {setValueToButtons.map((item) => {
          return (
            <Icon
              key={item[0]}
              name={item[0]}
              className={
                activeButton === item[1]
                  ? "side-bar__button side-bar__button-active"
                  : "side-bar__button"
              }
              onClick={(e) => getResponse(e.target)}
              value={item[1]}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default connect(
  (state) => ({
    texts: getTexts(state),
    activeButton: getActiveButton(state),
  }),
  (dispatch) => ({
    load: (activeButton) => dispatch(loadTexts(activeButton)),
    setActiveButton: (activeButton) => dispatch(setActiveButton(activeButton)),
    setActiveItem: () => dispatch(setActiveItem({})),
  })
)(SideBar);
