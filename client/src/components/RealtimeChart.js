import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

class RealtimeChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = null;
    this.state = {
      showChart: true,
      initValue: 0,
      dataSource: {
        chart: {
          caption: "Realtime Consumption Analytics by Category",
          refreshinterval: "3",
          slantLabels: "1",
          labeldisplay: "rotate",
          showValues: "0",
          showRealTimeValue: "0",
          numdisplaysets: "10",
          theme: "fusion",
          canvasPadding: "30"
        },
        categories: [
          {
            category: [
              {
                label: this.clientDateTime().toString()
              }
            ]
          }
        ],
        dataset: [
          {
            seriesName: "Paper",
            data: [{ value: 222 }]
          },
          {
            seriesName: "Recyclables",
            data: [{ value: 130 }]
          },
          {
            seriesName: "Compost",
            data: [{ value: 150 }]
          },
          {
            seriesName: "Landfill",
            data: [{ value: 355 }]
          }
        ]
      }
    };
    this.chartConfigs = {
      type: "realtimestackedarea",
      renderAt: "container",
      width: "100%",
      height: "350",
      dataFormat: "json"
    };
  }

  componentDidMount() {
    this.startUpdatingData();
  }

  startUpdatingData() {
    setInterval(() => {
      fetch("/currentdata")
        .then(res => res.json())
        .then(d => {
          let x_axis = d.time;

          this.chartRef.feedData(
            "&label=" +
              x_axis +
              "&value=" +
              d.paper +
              "|" +
              d.recyclables +
              "|" +
              d.compost +
              "|" +
              d.landfill
          );
        });
    }, 3000);
  }

  static addLeadingZero(num) {
    return num <= 9 ? "0" + num : num;
  }

  clientDateTime() {
    var date_time = new Date();
    var curr_hour = date_time.getHours();
    var zero_added_curr_hour = RealtimeChart.addLeadingZero(curr_hour);
    var curr_min = date_time.getMinutes();
    var curr_sec = date_time.getSeconds();
    var curr_time = zero_added_curr_hour + ":" + curr_min + ":" + curr_sec;
    return curr_time;
  }

  getChartRef(chart) {
    this.chartRef = chart;
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
              {this.state.showChart ? (
                <ReactFC
                  {...this.chartConfigs}
                  dataSource={this.state.dataSource}
                  onRender={this.getChartRef.bind(this)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RealtimeChart;
