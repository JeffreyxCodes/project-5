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

  handleInput = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChoiceInput = (e) => {
    const newChoices = [...this.state.choices];
    newChoices[e.currentTarget.dataset.index] = e.target.value;
    this.setState({
      choices: newChoices
    });
  }

  addChoice = () => {
    const newChoices = [...this.state.choices, ''];
    this.setState({
      choices: newChoices,
    });
  }

  removeChoice = () => {
    const newChoices = [...this.state.choices];
    newChoices.pop();
    this.setState({
      choices: newChoices,
    });
  }

  submitPoll = (e) => {
    e.preventDefault();
    
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

    // swal(

    // );
  }

  render() {
    return (
      <form action="" className="wrapper">
        <label
          className="visually-hidden"
          htmlFor="question">
          Poll Question
        </label>
        <textarea
          id="question"
          name="question"
          placeholder="Poll Question"
          rows="3"
          required
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
          placeholder="Name"
          required 
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
                  name={"choice" + index} 
                  placeholder={"Choice " + index} 
                  required
                  data-index={index - 1}
                  value={this.state.choices[index - 1]}
                  onChange={this.handleChoiceInput} />
              </div>
            )
          })
        }

        {this.state.choices.length < 5 ? <button onClick={this.addChoice}>Add Another Choice</button> : null}
        {this.state.choices.length > 2 ? <button onClick={this.removeChoice}>Remove Last Choice</button> : null}

        <button onClick={this.submitPoll}>Submit</button>
      </form>
    )
  }
}

export default Form;