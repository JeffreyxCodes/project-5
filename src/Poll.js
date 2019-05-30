import React, { Component } from 'react';
import Chart from 'chart.js';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    const chart = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: this.props.poll.choiceNames,
        datasets: [
          {
            label: "",
            data: this.props.poll.votes
          }
        ]
      },
      options: {
        legend: {
          display: false,
        }
      }
    });
  }

  render() {
    return (
      <div className="poll-container">
        <h2>{this.props.poll.question}</h2>
        <h3>By: {this.props.poll.name}</h3>
        <canvas ref={this.chartRef} />
      </div>
    )
  }
}

export default Poll;