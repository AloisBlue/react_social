import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "../../validations/isEmpty";

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.trim().split(' ')[0];
  const skills = profile.skills.map(( skill, index ) =>
    <div className="p-3" key={index}>
      <FontAwesomeIcon icon={faCheck} /> {skill}
    </div>
  )
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName} Bio</h3>
          <p className="lead">{isEmpty(profile.bio) ? (<span>There is no bio for {firstName}</span>) :
          (<span>{profile.bio}</span>)}</p><hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;
