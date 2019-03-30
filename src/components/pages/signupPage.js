import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SignupForm from "../forms/signupForm";
import { signup } from "../../actions/auth";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  render () {
    return(
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}


SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
