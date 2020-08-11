import React from "react";
import { connect } from "react-redux";

import { getActiveItem } from "../redux/selectors";

const Header = ({ activeItem }) => {
  return (
    <header className="header">
      <p className="header__activeItem">
        {(activeItem && activeItem.name
          ? activeItem.name
          : activeItem?.title) || ""}
      </p>
    </header>
  );
};

export default connect((state) => ({
  activeItem: getActiveItem(state),
}))(Header);
