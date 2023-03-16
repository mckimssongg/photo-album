import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {PrivateRoute} from "./routes/Private.routes";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/:album"
            element={<PrivateRoute component={Panel} />}
          ></Route> */}
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
