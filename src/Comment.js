import React, { Component } from 'react';
import firebase from './firebase.js';
import swal from '@sweetalert/with-react';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }
  }

  // handle comment input
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // post new comment
  postComment = (e) => {
    e.preventDefault();

    if (this.state.comment.trim()) {
      const dbRef = firebase.database().ref(this.props.id + '/comments/')
      dbRef.push(this.state.comment);

      this.setState({
        comment: ''
      });
    } else {
      swal(
        <div>
          <h2>Posting an empty comment is a no-no, please enter one with content or you'll a dog cry 😆</h2>
        </div>,
        {
          button: "Silly me 😝"
        }
      );
    }
  }

  render() {
    return (
      <div className="comment-container">
        <form onSubmit={this.postComment}>
          <label
            className="visually-hidden"
            htmlFor="comment">
            Comment
          </label>
          <textarea
            required
            maxLength="200"
            id="comment"
            name="comment"
            placeholder="Comment"
            rows="3"
            value={this.state.comment}
            onChange={this.handleInput}>
          </textarea>

          <button type="submit">Post Comment</button>
        </form>

        <div>
          {
            this.props.comments
              ? Object.keys(this.props.comments).reverse().map(comment => <p key={comment}>{this.props.comments[comment]}</p>)
              : null
          }
        </div>

      </div>
    );
  }
}

export default Comment;