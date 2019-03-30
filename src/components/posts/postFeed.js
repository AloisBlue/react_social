import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/posts";
import Spinner from "../common/spinner";
import ViewPosts from "./viewPosts";
import PostForm from "../forms/postForm";

class PostFeed extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props;
    let postsContent;

    if (posts === null || loading) {
      postsContent = <Spinner />
    } else if (posts) {
      postsContent = <div>
        <ViewPosts posts={posts} />
      </div>
    } else {
      postsContent = <p>No posts available</p>
    }

    return (
      <div className="view-posts">
        <div className="container">
          <div className="col-md-9">
            <div className="mb-4">
              <PostForm />
            </div>
            {postsContent}
          </div>
        </div>
      </div>
    );
  }
}

PostFeed.propTypes = {
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { getPosts })(PostFeed);
