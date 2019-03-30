import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, clearReduxError } from "../../actions/auth";
import { clearCurrentProfile } from "../../actions/profiles";


class NavBar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.clearReduxError();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Blue Hub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Developers</Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              { isAuthenticated ? (
                <Link className="nav-link" to="/postfeed">Post Feed</Link>
              ) : (
                null
              )}
            </li>
            <li className="nav-item">
              { isAuthenticated ? (
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              ) : (
                <Link className="nav-link" to="/signup">Signup</Link>
              )}
            </li>
            <li className="nav-item">
              { isAuthenticated ? (
                // eslint-disable-next-line
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                <img
                  className="rounded-circle"
                  src={user.user.avatar}
                  alt="off"
                  style={{ width: '25px', marginRight: '5px' }}
                  // title="You must have a gravatar connected to your email to display an image"
                />{' '}
                Logout
                </a>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      </nav>
    );
}
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  clearReduxError: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
  }
}

export default connect(mapStateToProps, { clearReduxError, clearCurrentProfile, logout })(NavBar);
