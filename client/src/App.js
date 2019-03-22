import React, { Component } from "react";
import Header from "./components/Header";
import RealtimeChart from "./components/RealtimeChart";
import HistoricalChart from "./components/HistoricalChart";
import Card from "./components/Card";
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

          <div className='col-12 mb-3'>
            <div className='card-deck custom-card-deck'>
              <Card header='BEST TIME TO PICK UP WASTE' value='3:15pm' />
              <Card header='LAST TIME EMPTIED' value='9:00am' />
              <Card header='DIVERSION RATE' value='84%' />
              <Card
                header='MOST THROWN OUT ITEM'
                value='Starbucks Coffe Cup'
                src='https://cdn1.iconfinder.com/data/icons/food-drink-7/100/FD_align-08-512.png'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
