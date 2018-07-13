import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

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
    $.ajax({
      method: "POST",
      url: "http://localhost:1128/repos",
      contentType: "application/json",
      data: term,
      success: function(data) {
        console.log('search successful');
        // initiate GET request
        $.ajax({
          method: 'GET',
          url: "something...",
          success: function(data) {
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