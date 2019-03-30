import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profiles";

class EducationDisplay extends Component {
  onClickDelete(e) {
    e.preventDefault();
    this.props.deleteEducation();
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td><Moment format="YYYY-MM-DD">{edu.from}</Moment></td>
        <td>
          {edu.to === null ? (' Now') : <Moment format="YYYY-MM-DD">{edu.to}</Moment>}
        </td>
        <td>
          <button type="button" onClick={this.onClickDelete.bind(this)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Details</h4>
        <table className="table">
          <thead>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>From</th>
            <th>To</th>
            <th />
          </thead>
          {education}
        </table>
      </div>
    );
  }
}

EducationDisplay.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.object.isRequired
}


export default connect(null, { deleteEducation })(withRouter(EducationDisplay));
