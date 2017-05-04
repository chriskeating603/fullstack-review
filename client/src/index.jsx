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
    var obj = {term: term}
    $.ajax({
      type: 'POST',
      url: '/repos/import',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      success: function (data) {
        alert('SUCCESS')
        console.log(data)
      },
      error: function (err) {
        alert('FAIL')
      }
    })
  }

  componentDidMount () {
    console.log('componentDidMount is happening');
    $.ajax({
      type: 'GET',
      url: '/repos',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          repos: data
        })
        alert('hurray!')
      },
      error: function (err) {
        console.log('err', err)
      }
    })
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