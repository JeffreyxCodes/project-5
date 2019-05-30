import React, { Component } from 'react';
import Chart from 'chart.js';
import pattern from 'patternomaly';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = undefined;

    this.state = {
      voted: false
    }
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    Chart.defaults.global.defaultFontColor = 'black';
    // Chart.defaults.global.defaultFontSize = '16';
    this.chart = new Chart(myChartRef, {
      type: "horizontalBar",
      data: {
        labels: this.props.poll.choiceNames,
        datasets: [
          {
            label: '',
            data: this.props.poll.votes,
            borderWidth: 3,
            backgroundColor: [
              pattern.draw('weave', 'rgba(152,251,152, 0.6)'),
              pattern.draw('diagonal', 'rgba(135,206,250, 0.6)'),
              pattern.draw('dot', 'rgba(221,160,221, 0.6)'),
              pattern.draw('plus', 'rgba(255,127,80, 0.6)'),
              pattern.draw('zigzag', 'rgba(240,230,140, 0.6)'),
            ],
            borderColor: [
              'palegreen',
              'lightskyblue',
              'plum',
              'coral',
              'khaki',
            ],
            hoverBackgroundColor: [
              pattern.draw('weave', 'palegreen'),
              pattern.draw('diagonal', 'lightskyblue'),
              pattern.draw('dot', 'plum'),
              pattern.draw('plus', 'coral'),
              pattern.draw('zigzag', 'khaki'),
            ]
          },
        ]
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          // titleFontSize: '12',
          // bodyFontSize: '12',
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });
  }

  vote = (votes, index) => {
    this.props.addVote(
      this.chart, // passing chart so chart.update() can be used
      this.props.id, // the unique key of this particular poll
      votes, // the votes array is pass to make access and hencing updating it easier
      index // the index of the vote to update
    )

    this.setState({
      voted: true
    });
  }

  render() {
    const {
      question,
      name,
      choiceNames,
      votes
    } = this.props.poll;

    return (
      <div className="poll-container">
        <div className="wrapper">
          <h2>{question}</h2>
          <h3>By: {name}</h3>
          <canvas ref={this.chartRef} aria-label="A poll data" role="img"></canvas>

          {
            this.state.voted
              ? <h4>Thanks for voting</h4>
              : <div>
                <h4>Vote For:</h4>
                {
                  choiceNames.map((choice, index) => {
                    return (
                      <div key={index}>
                        <label className="visually-hidden">{choice}: {votes[index]}</label>

                        <button onClick={() => {this.vote(votes, index)}}>
                          {choice}
                        </button>
                      </div>
                    )
                  })
                }
              </div>
          }

        </div>
      </div>
    )
  }
}

export default Poll;