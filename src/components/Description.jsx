import React/*, { useEffect }*/ from "react";
import { connect } from "react-redux";

import {
  getActiveItem,
  getTextLoading,
  getTextLoadingError,
  getRedirectionUrl,
  getTexts,
} from "../redux/selectors";
import People from "./discriptionComponents/People";
import Planets from "./discriptionComponents/Planets";
import Films from "./discriptionComponents/Films";
import Species from "./discriptionComponents/Species";
import Vehicles from "./discriptionComponents/Vehicles";
import Starships from "./discriptionComponents/Starships";
import { setActiveItem } from "../redux/actions";

const Description = ({
  activeItem,
  loading,
  loadingError,
  redirectionUrl,
  list,
  setActiveItem,
}) => {

  // useEffect(() => {
  //   return () => {
  //     setActiveItem({})
  //   }
  // })

  const discriptionComponents = {
    people: <People className='description__component' />,
    planets: <Planets className='description__component' />,
    films: <Films className='description__component' />,
    species: <Species className='description__component' />,
    vehicles: <Vehicles className='description__component' />,
    starships: <Starships className='description__component' />,
  };
  if (!activeItem && redirectionUrl && list) {
    let res = list.filter((el) => redirectionUrl === el.url)[0];
    setActiveItem(res);
  }
  return (
    <div className="description">
      {!loading &&
        !loadingError &&
        activeItem &&
        discriptionComponents[
          activeItem.active ||
            redirectionUrl.split("/")[redirectionUrl.split("/").length - 3]
        ]}
    </div>
  );
};

export default connect(
  (state) => ({
    loading: getTextLoading(state),
    loadingError: getTextLoadingError(state),
    activeItem: getActiveItem(state),
    redirectionUrl: getRedirectionUrl(state),
    list: getTexts(state),
  }),
  (dispatch) => ({
    setActiveItem: (activeItem) => dispatch(setActiveItem(activeItem)),
  })
)(Description);
