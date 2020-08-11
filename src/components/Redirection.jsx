import React, { useContext, useState, useEffect } from "react";
import { List, Label, Loader } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getActiveItem } from "../redux/selectors";
import { ContextForMaping } from "./discriptionComponents/CreateContext";
import {
  setActiveButton,
  setRedirectionUrl,
  loadTexts,
} from "../redux/actions";

const Redirection = ({
  activeItem,
  setActiveButton,
  setRedirectionUrl,
  load,
}) => {
  function setItemsAfterRedirect(item) {
    let splitedItem = item.url.split("/");
    setActiveButton(splitedItem[splitedItem.length - 3]);
    setRedirectionUrl(item.url);
    load(splitedItem[splitedItem.length - 3]);
  }
  const text = useContext(ContextForMaping);
  const [loading, setloading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (Array.isArray(activeItem[text]) && activeItem[text].length) {
      getLinkNames(
        activeItem[text][0].split("/")[
          activeItem[text][0].split("/").length - 3
        ]
      );
    } else {
      let nameFormLinkFetch =
        activeItem[text] && activeItem[text].length
          ? activeItem[text].split("/")[activeItem[text].split("/").length - 3]
          : null;
      getLinkNames(nameFormLinkFetch);
    }
  }, [activeItem, text]);

  function getLinkNames(item) {
    if (!item) {
      setLoadedData("");
    } else {
      setloading(true);
      let people = [];
      axios(`https://swapi.dev/api/${item}/`)
        .then((response) => {
          // collect people from first page
          people = response.data.results;
          return response.data.count;
        })
        .then((count) => {
          // exclude the first request
          const numberOfPagesLeft = Math.ceil((count - 1) / 10);
          let promises = [];
          // start at 2 as you already queried the first page
          for (let i = 2; i <= numberOfPagesLeft; i++) {
            promises.push(axios(`https://swapi.dev/api/${item}/?page=${i}`)); // problems with API
          }
          return Promise.all(promises);
        })
        .then((response) => {
          //get the rest records - pages 2 through n.
          people = response.reduce(
            (acc, data) => [...acc, ...data.data.results],
            people
          );
          setLoadedData(people);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }

  function showDownloadedData() {
    let items;

    if (Array.isArray(loadedData)) {
      if (loadedData.length) {
        items = loadedData.filter((item) => {
          let res;

          if (typeof activeItem[text] === "string") {
            if (item.url === activeItem[text]) {
              res = [item];
            }
          } else {
            for (let element of activeItem[text]) {
              if (item.url === element) {
                res = item;
              }
            }
          }
          return res;
        });

        return items.map((item, i) => (
          <List.Item
            as="a"
            key={uuid()}
            onClick={() => setItemsAfterRedirect(item)}
          >
            {item.name ? item.name : item.title}
          </List.Item>
        ));
      }
      return <List.Item style={{ cursor: "default" }}>n/a</List.Item>;
    } else {
      if (loadedData) {
        return (
          <List.Item as="a">
            {loadedData.name ? loadedData.name : loadedData.title}
          </List.Item>
        );
      } else {
        return <List.Item style={{ cursor: "default" }}>n/a</List.Item>;
      }
    }
  }

  if (loading) {
    return (
      <>
        <Label color="grey" horizontal>
          {text[0].toUpperCase() + text.substr(1)}:{" "}
        </Label>
        <Loader active inline />
      </>
    );
  }

  return (
    <>
      <Label color="grey" horizontal>
        {text[0].toUpperCase() + text.substr(1)}:{" "}
      </Label>
      <List link selection>
        {showDownloadedData()}
      </List>
    </>
  );
};

export default connect(
  (state) => ({
    activeItem: getActiveItem(state),
  }),
  (dispatch) => ({
    setActiveButton: (activeButton) => dispatch(setActiveButton(activeButton)),
    setRedirectionUrl: (url) => dispatch(setRedirectionUrl(url)),
    load: (activeButton) => dispatch(loadTexts(activeButton)),
  })
)(Redirection);
