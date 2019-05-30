import React, { Component } from 'react';
import firebase from './firebase.js';
import Poll from './Poll.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      polls: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', response => {
      const newPolls = [];
      const polls = response.val();

      for (let key in polls) {
        newPolls.push({
          key: key,
          poll: polls[key]
        });
      }

      this.setState({
        polls: newPolls,
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isLoading
            ? <h2>Loading...</h2>
            : this.state.polls.map(poll => {
              return <Poll key={poll.key} poll={poll.poll} />
            })
        }
      </div>
    );
  }
}

export default App;