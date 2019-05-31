import React, { Component } from 'react';
import firebase from './firebase.js';
import Form from './Form.js';
import Poll from './Poll.js';

import swal from '@sweetalert/with-react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // array of objects, each of which contains a unique key and the poll object
      polls: [],
      isLoading: true,
    }
  }

  // save a vote to firebase
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

  // save a poll to firebase
  addPoll = (poll) => {
    const dbRef = firebase.database().ref();

    dbRef.push(poll);
  }

  componentDidMount() {
    // for testing swal on submit in form
    // swal(
    //   <div>
    //     <h2>Thanks for submitting</h2>
    //     <p>Let's scroll down and check out the available polls!</p>
    //   </div>,
    //   {
    //     icon: 'success',
    //     button: "Let's Do It!"
    //   }
    // )

    const dbRef = firebase.database().ref().orderByKey();

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
        <div className="full-view">
          <h1>(╯°□°)╯︵ ┻━┻</h1>
          <h1>POLL UP</h1>
          <Form addPoll={this.addPoll} />
        </div>

        <section className="polls-container">
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
        </section>
      </div>
    );
  }
}

export default App;