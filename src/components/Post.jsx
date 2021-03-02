import React from 'react';
import PropTypes from 'prop-types';

class Post extends React.Component {
  render() {
    const { post , author } = this.props;
    return (
      <li>
        <p>{ post.body }</p>
        <h5>{ author }</h5>
      </li>
    );
  }
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  author: PropTypes.string,
}

Post.defaultProps = {
  author: "",
}

export default Post;