import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
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
          <h1 className="App-title">Find Your Coffee!</h1>
        </header>
        <div id="brewd-container">
          <form id="search" onSubmit={this.handleSubmit}>
            <div id="coffee">
              <label>
              <select title="Cofee Roasters" ref="coff">
                <option value="roaster1">Roaster 1</option>
                <option value="roaster2">Roaster 2</option>
              </select>
              </label>
            </div>
            <br />
            <div id="milk">
              <label>
              <select title="Milk Brands" ref="milk">
                <option value="milk1">Milk 1</option>
                <option value="milk2">Milk 2</option>
              </select>
              </label>
            </div>
            <br />
            <div>
              <input type="submit" value="Find Cafes" />
            </div>
          </form>
        </div>
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
