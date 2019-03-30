import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { likePost } from "../../actions/posts";

class ViewPosts extends Component {
  state: {
    data: {
      like: false
    },
    errors: {}
  }

  onClickLike(id) {
    this.props.likePost(id);
  }

  render () {
    const { posts } = this.props;
    const allpost = posts.map(post => (
      <li className="card card-body bg-light p-2 col-md-12">
        <p>{post.text}</p>
        <small>Posted by:{' '}
          <span className="text-info">{post.user === null ? ('Unknown') :
            (post.user && post.user.name)}
          </span>
        </small>
        <small>
          <button type="button" className="btn btn-light text-muted" onClick={this.onClickLike.bind(this, post._id)}>
            <FontAwesomeIcon icon={faThumbsUp} /> Likes
            <span className="badge badge-light ">{post.likes.length}</span>
          </button>{' '}
          <span className="text-danger"><FontAwesomeIcon icon={faThumbsDown} /> Unlike</span>
          <span className="float-right"><FontAwesomeIcon icon={faComment} /> Comment</span>
        </small>
      </li>
      ));

      return (
        <div className="view-posts">
          <div className="container">
            <div className="col-md-9">
              <div className="">
                {allpost}
              </div>
            </div>
          </div>
        </div>
      );
  }
}


ViewPosts.propTypes = {
  posts: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired
}

export default connect(null, { likePost })(ViewPosts);
