import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { faFacebook, faTwitter, faYoutube, faLinkedin, faInstagram  } from '@fortawesome/free-brands-svg-icons';
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import SelectListGroup from "../common/selectListGroup";
import InputGroup from "../common/inputGroup";
import { createProfile } from "../../actions/profiles";

class CreateProfile extends Component {
  state = {
    data: {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''

    },
    displaySocialInputs: false,
    loading: false,
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false })
    }
  }

  onChange = (e) =>
  this.setState({
    ...this.state,
    data:{ ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.createProfile(this.state.data, this.props.history)
  }

  render() {
    const asterisk = <span style={{ color: 'red'}}>*</span>
    const { errors, data, loading, displaySocialInputs } = this.state;
    let socialInput;

    if (displaySocialInputs) {
      socialInput = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon = {faTwitter}
            value={data.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon = {faFacebook}
            value={data.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Youtube channel URL"
            name="youtube"
            icon={faYoutube}
            value={data.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon={faLinkedin}
            value={data.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon={faInstagram}
            value={data.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    const options = [
      { label: 'Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Teacher/instructor', value: 'Teacher/instructor' },
      { label: 'Student/Learning', value: "Student/Learning" },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other'}
    ];

    return(
      <div className="create-profile">
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
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">Let us get some info to make your profile better</p>
              <small className="d-block pb-3">Fields marked with {asterisk} are required</small>
              <form onSubmit={this.onSubmit} loading={loading}>
                <TextFieldGroup
                  label={asterisk}
                  name="handle"
                  placeholder = "Profile Handle"
                  value={data.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name or nickname"
                />
                <SelectListGroup
                  label={asterisk}
                  id='status'
                  placeholder="Status"
                  name="status"
                  value={data.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of what your career is"
                />
                <TextFieldGroup
                  name="company"
                  placeholder = "Company"
                  value={data.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="You can give your employer or own company"
                />
                <TextFieldGroup
                  name="website"
                  placeholder = "Website"
                  value={data.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Add your website"
                />
                <TextFieldGroup
                  name="location"
                  placeholder = "Give your location"
                  value={data.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Helps determine closest developers e.g (Nairobi, Kenya)"
                />
                <TextFieldGroup
                  label={asterisk}
                  name="skills"
                  placeholder = "Skills"
                  value={data.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Enter comma separated values e.g (CSS, HTML, Javascript, React, Java)"
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder = "Enter github username"
                  value={data.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Helps view your latest five repos"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder = "Short Bio"
                  value={data.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Give a little description of yourself"
                />

                <div className="mb-3 mt-2">
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                  >
                    Add Social Networks Links
                  </button>
                  <span className="ml-2 text-muted">Optional</span>
                </div>
                {socialInput}
                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit Profile" />
              </form>
              <p className="mt-2 text-center text-muted">Use the button on top of page to go back to dashboard</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  return{
    profile: state.profiles,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
