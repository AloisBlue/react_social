import React, { Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profiles";
import ProfileItems from "./profileItems";
import Spinner from "../common/spinner";

class GetProfiles extends Component {

  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    }
    else if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItems key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }


    return (
      <div>
        <h1 className="display-4 text-center">Developer Profiles</h1>
        <p className="lead text-center">Browse and connect with developers</p>
        <span>{ profileItems }</span>
      </div>
    );
  }
}

GetProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles.profiles
  }
}

export default connect(mapStateToProps, { getProfiles })(GetProfiles);
