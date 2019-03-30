import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profiles"

class ExperienceDisplay extends Component {
  onClickDelete(e) {
    e.preventDefault();
    this.props.deleteExperience();
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
        <td><Moment format="YYYY-MM-DD">{exp.from}</Moment></td>
        <td>
          {exp.to ===null ? (' Now') : <Moment format="YYYY-MM-DD">{exp.to}</Moment>}
        </td>
        <td>
          <button type="button" className="btn btn-danger" onClick={this.onClickDelete.bind(this)}>
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Details</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>From</th>
              <th>To</th>
              <tr />
            </tr>
          </thead>
          {experience}
        </table>
      </div>
    );
  }
}

ExperienceDisplay.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired
}

export default connect(null, { deleteExperience })(withRouter(ExperienceDisplay));
