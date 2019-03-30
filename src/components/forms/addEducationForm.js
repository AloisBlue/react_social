import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import { addEducation }  from "../../actions/profiles";

class AddEducationForm extends Component {
  state = {
    data: {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    },
    disabled: false,
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onCheck = () =>
    this.setState(prevState => ({
      ...this.state,
      data: {...this.state.data, current: !prevState.data.current},
      disabled: !prevState.disabled
    }))

  onChange = (e) =>
  this.setState({
    ...this.state,
    data: {...this.state.data, [e.target.name]: e.target.value}
  })

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addEducation(this.state.data, this.props.history)
  }

  render() {
    const { data, errors, disabled } = this.state;
    const asterisk = <span style={{color: 'red'}}>*</span>
    return (
      <div className="add-education">
        <div className="container">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            this.props.history.push("/dashboard")
          }}
        >Go back to dashboard</button>

          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Tell us more about your education</p>
              <small className="d-block pb-3">Fields marked with {asterisk} are required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label={asterisk}
                  name="school"
                  placeholder="School"
                  type="text"
                  value={data.school}
                  onChange={this.onChange}
                  info="Name of the school which you attend/attended"
                  error={errors.school}
                />
                <TextFieldGroup
                  label={asterisk}
                  name="degree"
                  placeholder="Qualification"
                  type="text"
                  value={data.degree}
                  onChange={this.onChange}
                  info="Could be degree/diploma/certificate"
                  error={errors.degree}
                />
                <TextFieldGroup
                  label={asterisk}
                  name="fieldofstudy"
                  placeholder="The Field of Study"
                  type="text"
                  value={data.fieldofstudy}
                  onChange={this.onChange}
                  info="Field of study e.g(B.Ed, B.Sc, Medicine)"
                  error={errors.fieldofstudy}
                />
                <h6>{asterisk}</h6>
                <TextFieldGroup
                  label="From Date"
                  name="from"
                  type="date"
                  value={data.from}
                  onChange={this.onChange}
                  info="Time when you started this course"
                  error={errors.from}
                />
                <TextFieldGroup
                  label="To Date"
                  name="to"
                  type="date"
                  value={data.to}
                  onChange={this.onChange}
                  info="Date of completion"
                  disabled={disabled ? 'disabled' : ''}
                  error={errors.to}
                />
                <div className="mt-4 mb-4">
                  <small className="text-info">Still in school ? Select the checkbox below</small>
                  <br />
                  <input
                    id="current"
                    name="current"
                    type="checkbox"
                    value={data.current}
                    checked={data.current}
                    onChange={this.onCheck.bind(this)}
                    error={errors.current}
                  />
                </div>
                <TextAreaFieldGroup
                  name="description"
                  placeholder="Short Description"
                  type="text"
                  value={data.description}
                  onChange={this.onChange}
                  info="Give a short description on your education"
                  error={errors.description}
                />
                <input type="submit" value="Add Education" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducationForm.propTypes = {
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducationForm));
