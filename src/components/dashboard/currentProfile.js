import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfile } from "../../actions/profiles";
import Spinner from "../common/spinner";
import ProfileActions from "./profileActions";
import ExperienceDisplay from "./experienceDisplay";
import EducationDisplay from "./educationDisplay";
import { deleteUserAccount } from "../../actions/auth";

class CurrentProfile extends Component {

  componentDidMount() {
    this.props.getProfile()
  }

  onClickDelete(e) {
    e.preventDefault();
    this.props.deleteUserAccount();
  }

  render() {
    const { user } = this.props.user;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length === 0) {
      dashboardContent =
      <div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have no profile, proceed to making profile to access full
          functionality
        </p>
        <Link to="create-profile" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>;
    } else {
      dashboardContent =
      <div>
        <p className="text-muted">Welcome
        <Link className="ml-2" to={`/profile/${profile.handle}`}>{user.name}</Link>
        </p>
        <ProfileActions />
        <ExperienceDisplay experience={profile.experience} />
        <EducationDisplay education={profile.education} />
        <div style={{ margin: '6px' }}>
          <button onClick={this.onClickDelete.bind(this)} type="button" className="btn btn-danger" to="/">Delete Account</button>
        </div>
      </div>
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
      user: state.user.user,
      profile: state.profiles
    };
}

export default connect(mapStateToProps, { getProfile, deleteUserAccount })(CurrentProfile);
