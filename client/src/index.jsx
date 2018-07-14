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

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
  // axios.post('/repos', {
  //     username: term
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    // $.post( "/repos", function( data ) {
    //   console.log(data);
    // });
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
            console.log(data)
            console.log('GET REQUEST successful');
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

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));