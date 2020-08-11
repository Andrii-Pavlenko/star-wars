import React from "react";
import { Image } from "semantic-ui-react";
import waider from "./images/dart_waider.jpg";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import MainList from "./components/MainList";
import Description from "./components/Description";

function App() {
  return (
    <div className="App">
      <SideBar />
      <div className="App__mainContainer">
        <Header />
        <div className="App__containerForLists">
          <MainList />
          <Description />
        </div>
      </div>
      <Image
        src={waider}
        size="medium"
        rounded
        style={{ 
          position: "absolute",
          right: 0,
          bottom: 0,
          height: '14vh',
          width: 'auto',
        }}
      />
    </div>
  );
}

export default App;
