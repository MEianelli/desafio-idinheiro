import React from 'react';
import './App.css';
import { fetchPosts, fetchUsers } from './api';
import Post from './components/Post';

class App extends React.Component {
  constructor(){
    super();
    this.getUserName = this.getUserName.bind(this);
    this.getArrayOfPostsToShow = this.getArrayOfPostsToShow.bind(this);
    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickTen = this.handleClickTen.bind(this);
    this.requestPosts = this.requestPosts.bind(this);
    this.requestUsers = this.requestUsers.bind(this);
    this.state = {
      allPosts: [],
      allUsers: [],
      lastTenPosts: [],
      loadingApi: false,
      displayAll: true,
    }
  }

  componentDidMount(){
    this.requestPosts();
    this.requestUsers();
  }

  requestPosts(){
    this.setState( () => ({ loadingApi: true }), () => {
      fetchPosts().then( posts => this.setState( () => ({
        allPosts: posts,
        loadingApi: false,
      })));
    })
  }

  requestUsers(){
    this.setState( () => ({ loadingApi: true }), () => {
      fetchUsers().then( users => this.setState( () => ({
        allUsers: users,
        loadingApi: false,
      })));
    })
  }

  getUserName(userId){
    const { allUsers } = this.state;
    const authorName = allUsers.find( ({id}) => userId === id);
    return authorName?.name;
  }

  getArrayOfPostsToShow(){
    const { allPosts, lastTenPosts, displayAll } = this.state;
    if( displayAll ) {
      return allPosts;
    } else{
      return lastTenPosts
    }
  }

  handleClickAll(){
    this.setState( () => ({
      displayAll: true,
    }))
  }

  handleClickTen(){
    const { allPosts } = this.state;
    const lastTen = allPosts.slice(-10);
    this.setState( () => ({
      lastTenPosts: lastTen,
      displayAll: false,
    }))
  }

  renderLoading(){
    return(
      <div className="loadingApi">LOADING API...</div>
    );
  }

  renderPosts(){
    return(
      <ul>
        { this.getArrayOfPostsToShow().map( post => {
          const currentAuthor = this.getUserName(post.userId);
          return <Post post={ post } author={ currentAuthor } key={ post.id }/>
        })}
      </ul>
    );
  }

  render() {
    const { loadingApi } = this.state;
    return (
      <div className="mainBlogDiv">
        <h1>My Blog</h1>
        <div className="buttonsDiv">
          <button 
            type="button" 
            onClick={ this.handleClickAll }
          >Show All Posts
          </button>
          <button 
            type="button"
            onClick={ this.handleClickTen }
          >Show Last 10 Posts
          </button>
        </div>
        { loadingApi ? this.renderLoading() : this.renderPosts() }
      </div>
    );
  }
}

export default App;
