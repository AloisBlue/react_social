import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faGraduationCap  } from '@fortawesome/free-solid-svg-icons';
import { faBlackTie  } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

const ProfileActions = () => {

    return(
      <div>
        <div className="btn-group mb-4" role="group">
          <Link to="/edit-profile" className="btn-light btn">
            <FontAwesomeIcon icon={faUserCircle} className="text-info mr-1" />Edit Profile
          </Link>
          <Link to="/add-experience" className="btn-light btn">
          < FontAwesomeIcon icon={faBlackTie} className="text-info mr-1" />Add Experience
          </Link>
          <Link to="/add-education" className="btn-light btn">
             <FontAwesomeIcon icon={faGraduationCap} className="text-info mr-1" />Add Education
          </Link>
        </div>
      </div>
    );
  }

export default ProfileActions;
