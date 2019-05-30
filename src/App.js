import React, { Component } from 'react';
import firebase from './firebase.js';
import Poll from './Poll.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // array of objects, each of which contains a unique key and the poll object
      polls: [], 
      isLoading: true,
    }
  }

  addVote = (chart, key, votes, choiceIndex) => {
    const dbRef = firebase.database().ref(key);

    const newVotes = votes;
    newVotes[choiceIndex]++;

    dbRef.child('/votes/').set(newVotes);

    const newPolls = [...this.state.polls].map(poll => {
      if (poll.key === key) {
        poll.votes = newVotes;
      }
      return poll;
    });
  
    // setting a new poll so that react will update
    this.setState({
      polls: newPolls
    });

    chart.update();
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    // with this ref, firebase will only react when change happens at the root
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
            : this.state.polls.map(pollObject => {
              return <Poll 
                        key={pollObject.key}
                        id={pollObject.key}
                        poll={pollObject.poll} 
                        addVote={this.addVote}
                      />
            })
        }
      </div>
    );
  }
}

export default App;