import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profiles"
import Spinner from "../common/spinner";
import ProfileHeader from "./profileHeader";
import ProfileAbout from "./profileAbout";
import ProfileCredits from "./profileCredits";
import ProfileGit from "./profileGit";

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
        this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    }
    else if (profile) {
      profileContent = <div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <Link to="/profile" className="btn btn-dark">
              Back to Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCredits
          experience={profile.experience}
          education={profile.education}
        />
        <ProfileGit />
      </div>
    }
    else {
      profileContent = <h4>No profile found!!!</h4>
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profiles.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(UserProfile);
