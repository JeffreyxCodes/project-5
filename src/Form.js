import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: ['', ''],
      name: '',
      question: '',
    }
  }

  // sets the input element values to its repective state values
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // sets the choice input elements to its repective state values;
  // having a seperate input handler for cleaner code
  handleChoiceInput = (e) => {
    const newChoices = [...this.state.choices];
    newChoices[e.currentTarget.dataset.index] = e.target.value;
    this.setState({
      choices: newChoices
    });
  }

  // adds another choice input field
  addChoice = () => {
    const newChoices = [...this.state.choices, ''];
    this.setState({
      choices: newChoices,
    });
  }

  // remove the last choice input field
  removeChoice = () => {
    const newChoices = [...this.state.choices];
    newChoices.pop();
    this.setState({
      choices: newChoices,
    });
  }

  // submit the poll with the information given
  submitPoll = (e) => {
    e.preventDefault();

    // used a if statement to do form validation on textarea element
    if (this.state.question.trim()) {
      this.props.addPoll({
        name: this.state.name,
        question: this.state.question,
        choiceNames: this.state.choices,
        votes: new Array(this.state.choices.length).fill(0)
      });

      this.setState({
        choices: ['', ''],
        name: '',
        question: '',
      });

      swal(
        <div>
          <h2>Thanks for submitting</h2>
          <p>Let's scroll down and check out the available polls!</p>
        </div>,
        {
          icon: 'success',
          button: "Let's Do It!"
        }
      );
    } else { // poll is not submitted if textarea is empty
      swal(
        <div>
          <h2>The poll question is empty, please enter one or you'll break the internet 😆</h2>
        </div>,
        {
          button: "Silly me 😝"
        }
      );
    }
  }

  render() {
    return (
      <form action="" className="wrapper" onSubmit={this.submitPoll}>
        <label
          className="visually-hidden"
          htmlFor="question">
          Poll Question
        </label>
        <textarea
          required
          maxlength="200"
          id="question"
          name="question"
          placeholder="Poll Question"
          rows="3"
          value={this.state.question}
          onChange={this.handleInput}>
        </textarea>

        <label
          className="visually-hidden"
          htmlFor="name">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          required
          pattern="\S.{0,40}"
          title="Please enter 1 to 40 characters."
          value={this.state.name}
          onChange={this.handleInput} />

        {
          this.state.choices.map((choice, index) => {
            index++;
            return (
              <div key={index}>
                <label
                  className="visually-hidden"
                  htmlFor={"choice" + index}>
                  {"Choice " + index}
                </label>

                <input
                  type="text"
                  id={"choice" + index}
                  className={"choice" + index}
                  name={"choice" + index}
                  placeholder={"Choice " + index}
                  required
                  pattern="\S.{0,60}"
                  title="Please enter 1 to 60 characters."
                  data-index={index - 1}
                  value={this.state.choices[index - 1]}
                  onChange={this.handleChoiceInput} />
              </div>
            )
          })
        }

        {this.state.choices.length < 5 ? <button type="button" onClick={this.addChoice}>Add Another Choice</button> : null}
        {this.state.choices.length > 2 ? <button type="button" onClick={this.removeChoice}>Remove Last Choice</button> : null}

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default Form;