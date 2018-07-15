import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    // this.handleGetData = this.handleGetData.bind(this);
  }
  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({ username: term }),
      success: function(data) {
        console.log('search successful');
        // initiate GET request
        $.ajax({
          method: 'GET',
          url: "/top25",
          success: function(data) {
            // console.log(this.state.repos)
            // this.setState({
            //   repos: data
            // })
            // console.log(this);
            // console.log(data)
            // console.log('GET REQUEST successful');
          },
          error: function(err) {
            console.log('unsuccessful GET request');
          }
        })
      },
      error: function(err) {
        console.log('unsuccessful search');
      }
    });
  }
  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/top25",
      success: function(data) {
        console.log(Array.isArray(data))
        this.setState({repos: data});
      }.bind(this),
      error: function(err) {
        console.log('unsuccessful GET request');
      }
    });
  }
  handleGetData(data) {
    this.setState({
      repos: data
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));