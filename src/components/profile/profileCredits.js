import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileCredits = ({ experience, education }) => {
  const expItems = experience.map(exp => (
    <li key={exp._id} className="list-group-items">
      <h4>{exp.company}</h4>
      <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
      {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
      <p>{exp.title === '' ? null :
      (<span><strong>Postition: </strong>{exp.title}</span>)}</p>
      <p>{exp.location === '' ? null :
      (<span><strong>Location: </strong>{exp.location}</span>)}</p>
      <p>{exp.description === '' ? null :
      (<span><strong>Description: </strong>{exp.description}</span>)}</p>
    </li>
  ));

  const eduItems = education.map(edu => (
    <li key={edu._id} className="list-group-items">
      <h4>{edu.school}</h4>
      <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
      {edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
      <p><strong>Qualification: </strong>{edu.degree}</p>
      <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
      {edu.description === '' ? null :
      (<span><strong>Description: </strong>{edu.description}</span>)}
    </li>
  ))

  return(
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? <ul className="list-group">{expItems}</ul> :
        <span>No experience listed</span>}
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        {eduItems.length > 0 ? <ul className="list-group">{eduItems}</ul> :
        <span>No education details listed</span>}
      </div>
    </div>
  );
}

ProfileCredits.propTypes = {
  experience: PropTypes.object.isRequired,
  education: PropTypes.object.isRequired
}

export default ProfileCredits;
