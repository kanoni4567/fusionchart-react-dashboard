import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch("/historicaldata").then(jsonify);
const schemaFetch = fetch("/dataschema").then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Historical Consumption Analytics by Category"
  },
  subcaption: {
    text: "From March 21 0:00 to March 22 0:00"
  },
  series: "Type",
  yaxis: [
    {
      plot: "Weight",
      title: "Weight",
      format: {
        suffix: "lbs"
      }
    }
  ]
};

class HistoricalChart extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "100%",
        height: "400",
        dataSource
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      //   console.log(data);
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      //   console.log(fusionTable);
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div className='row mt-5 mt-xs-4'>
        <div className='col-12 mb-3'>
          <div className='card-deck custom-card-deck' />
        </div>
        <div className='col-12'>
          <div className='card custom-card mb-5 mb-xs-4'>
            <div className='card-body'>
              {this.state.timeseriesDs.dataSource.data ? (
                <ReactFC {...this.state.timeseriesDs} />
              ) : (
                "loading"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoricalChart;
