import React, {Component} from "react";
import PropTypes from "prop-types";
import { isEmail } from "validator";
import TextFieldGroup from "../common/textFieldGroup";

class SignupForm extends Component {

  state = {
    data: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    loading: false,
    errors: {}
  };

  onChange = (e) =>
  this.setState({
    ...this.state,
    data:{...this.state.data, [e.target.name]: e.target.value}
  });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data, loading: false }));
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email address";
    if (data.password !== data.confirmpassword) errors.confirmpassword = "Passwords must match";
    if (!data.name) errors.name = "Name can't be blank";
    if (!data.email) errors.email = "Email can't be blank"
    if (!data.password) errors.password = "Password can't be blank";
    if (!data.confirmpassword) errors.confirmpassword = "Confirm password can't be blank";

    return errors;
  };

  render () {
    const { data, errors, loading } = this.state;
    return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Sign up for an account</p>
            <form onSubmit={this.onSubmit} loading={loading}>
              <TextFieldGroup
                label="Name"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={this.onChange}
                error={errors.name}
              />

              <TextFieldGroup
                label="Email"
                id="email"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={this.onChange}
                info="This site uses gravatar, if you want profile image, user a gravatar email"
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

              <TextFieldGroup
                label="Confirm Password"
                id="confirmpassword"
                type="password"
                name="confirmpassword"
                placeholder="Confirm your password"
                value={data.confirmpassword}
                onChange={this.onChange}
                error={errors.confirmpassword}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" value="Signup" />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
