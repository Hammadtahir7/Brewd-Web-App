import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => {this.setState({ response: res });console.log(res);})
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/brewd?coff=roaster1&milk=milk1');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    var brewd = this.state.response;
    brewd = brewd.map(function(brewd, index){
    return(
          <li key={index}>
            <span className="name">{brewd.cafeName}</span>
          </li>);
    });

    var loc = this.state.response;
    loc = loc.map(function(loc, index){
    return(
      <Marker
        position={{lat: loc.lat, lng: loc.lng}}
      key={index}/>
    );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul className="App-intro">{brewd}</ul>
        <Map google={this.props.google}
          center={{lat: -37.82, lng: 144.95}}
          zoom={13}>
          {loc}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD9JHkbadijmTIImbs3SMTsMvte7bkBFaE")
})(App)
