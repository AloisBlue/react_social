import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmail } from "validator";
import TextFieldGroup from "../common/textFieldGroup";

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) =>
  this.setState({
    ...this.state,
    data:{ ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    console.log(errors.email)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
      if (Object.keys(errors).length === 0) {
        this.setState({ loading: false })
      }
    }
  }

  validate = (data) => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.email) errors.email = "Email can't be blank";
    if (!data.password) errors.password = "Password can't be blank";

    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;
    return(
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Login to your account</p>
              { errors.global &&(
                <div style={{ color:" #ae5856" }}>
                  <h2>Something went wrong</h2>
                  <p>{errors.global}</p>
                </div>
              )}
              <form onSubmit={this.onSubmit} loading={loading}>
                <TextFieldGroup
                  label="Email"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return {
//     errors: state.errors
//   };
// }

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(LoginForm);
