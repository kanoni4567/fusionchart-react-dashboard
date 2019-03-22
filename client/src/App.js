import React, { Component } from "react";
import Header from "./components/Header";
import RealtimeChart from "./components/RealtimeChart";
import HistoricalChart from "./components/HistoricalChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header branding='Intuitive' />
        <div className='container'>
          <RealtimeChart />
          <HistoricalChart />
        </div>
      </div>
    );
  }
}

export default App;
