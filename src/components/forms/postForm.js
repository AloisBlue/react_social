import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import { createPost } from "../../actions/posts";

class PostForm extends Component {
  state = {
    data: {
      text: ''
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) =>
  this.setState({
    ...this.state,
    data: {...this.state.data, [e.target.name]: e.target.value}
  });

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.isAuthenticated) {
        this.props.createPost(this.state.data);
        this.setState({
          ...this.state,
          data: {...this.state.data, text: ''}
        });
    } else {
      this.setState({
        ...this.state,
        errors: {...this.state.errors, noauth: "You must be logged in to post"} });
    }
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="post-form">
        <div className="container">
          <div className="col-md-9">
          { errors.noauth &&(
            <div style={{ color:" #ae5856" }}>
              <h2>Not allowed</h2>
              <p>{errors.noauth}</p>
            </div>
          )}
            <form onSubmit={this.onSubmit}>
              <small>Post your issues here (Questions & answers): </small>
              <TextAreaFieldGroup
                placeholder="Post here"
                name="text"
                value={data.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <input type="submit" className="btn btn-info btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { createPost })(PostForm);
