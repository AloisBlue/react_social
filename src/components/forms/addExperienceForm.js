import React, { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import { addExperience } from "../../actions/profiles";

class AddExperience extends Component {
  state = {
    data: {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
    },
    disabled: false,
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onCheck = () => {
    this.setState(prevState => ({
      ...this.state,
      data: {...this.state.data, current: !prevState.data.current},
      disabled: !prevState.disabled
    }));
  }

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addExperience(this.state.data, this.props.history);
  }

  render() {
    const { data, errors, disabled } = this.state;
    const asterisk = <span style={{ color: 'red'}}>*</span>;

    return (
      <div className="add-exerience">
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
          <h1 className="display-4 text-center">Add Experience</h1>
          <p className="lead text-center">
            Let us update your profile to make it perfect, describe experience you have
            had before
          </p>
          <small className="d-block pb-3">Fields marked with {asterisk} are required</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              label={asterisk}
              name="title"
              placeholder="Title of position you held"
              value={data.title}
              onChange={this.onChange}
              error={errors.title}
              info="This is the name of occupation"
            />
            <TextFieldGroup
              label={asterisk}
              name="company"
              placeholder="Company/Institution"
              value={data.company}
              onChange={this.onChange}
              error={errors.company}
              info="Could be company, instituion or foundation"
            />
            <TextFieldGroup
              name="location"
              placeholder="Location"
              value={data.location}
              onChange={this.onChange}
              error={errors.location}
              info="Location of the company"
            />
            <h6>{asterisk}</h6>
            <TextFieldGroup
              label="From Date"
              name="from"
              type="date"
              value={data.from}
              onChange={this.onChange}
              error={errors.from}
              info="The time of engangement with the company"
            />
            <TextFieldGroup
              label="To date"
              name="to"
              type="date"
              value={data.to}
              onChange={this.onChange}
              error={errors.to}
              info="The time you left the company"
              disabled={disabled ? 'disabled' : ''}
            />

            <div className="mt-4 mb-4">
              <small className="text-info">Still working ? Select the checkbox below</small>
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
              error={errors.description}
            />

            <input type="submit" className="btn btn-info btn-block mt-4" value="Add Experience" />
          </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
