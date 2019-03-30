import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Footer from "./components/layout/footer";
import SignupPage from "./components/pages/signupPage";
import LoginPage from "./components/pages/loginPage";
import GetProfiles from "./components/profiles/getProfiles";
import CurrentProfile from "./components/dashboard/currentProfile";
import UserRoute from "./components/routes/userRoute";
import GuestRoute from "./components/routes/guestRoute";
import CreateProfileForm from "./components/forms/createProfileForm";
import EditProfileForm from "./components/forms/editProfileForm";
import AddExperienceForm from "./components/forms/addExperienceForm";
import AddEducationForm from "./components/forms/addEducationForm";
import UserProfile from "./components/profile/userProfile";
import PostFeed from "./components/posts/postFeed";

const App = ({ location }) => {
    return (
      <div className="App">
        <NavBar />
        <GuestRoute location={ location } path="/" exact component={ Landing } />
        <Route location={ location } path="/profile" exact component={ GetProfiles } />
        <Route location={location} path="/profile/:handle" exact component={UserProfile} />
        <Route location={location} path="/postfeed" exact component={PostFeed} />
        <UserRoute location={ location } path="/dashboard" exact component={ CurrentProfile } />
        <UserRoute location={location} path="/create-profile" exact component={ CreateProfileForm } />
        <UserRoute location={location} path="/edit-profile" exact component={ EditProfileForm } />
        <UserRoute location={location} path="/add-experience" exact component={AddExperienceForm} />
        <UserRoute location={location} path="/add-education" exact component={AddEducationForm} />
        <GuestRoute location={ location } path="/signup" exact component={ SignupPage } />
        <GuestRoute location={ location } path="/login" exact component={ LoginPage } />
        <Footer />
      </div>
    );
  }

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
