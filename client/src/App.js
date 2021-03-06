import React, { Component } from 'react';
import './styles.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Table, Card, Container, Row, Col, Button, Form, Input } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {response: [], rl: [], ml: []};
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
     window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    fetch('/api/brewd/roasterList/').then(function(data){
      return data.json();
    }).then(res => {this.setState({rl: res });console.log(res);})
    .catch(err => console.log(err));
    fetch('/api/brewd/milkList/').then(function(data){
      return data.json();
    }).then(res => {this.setState({ml: res });console.log(res);})
    .catch(err => console.log(err));
  }

  render() {

    var roaster = this.state.rl;
    roaster = roaster.map(function(roaster, index){
    return(
      <option key={index} value={roaster}>{roaster}</option>)
    });

    var milk = this.state.ml;
    milk = milk.map(function(milk, index){
    return(
      <option key={index} value={milk}>{milk}</option>)
    });

    var brewd = this.state.response;
    brewd = brewd.map(function(brewd, index){
    return(
      <tr key={index}>
        <th scope="row"></th>
        <td>{brewd.cafeName}</td>
        <td>{brewd.address}</td>
        <td>{brewd.suburb}</td>
        <td>{brewd.city}</td>
      </tr>)
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
      <div id="SC" className="search-cafe">
          <Card className="search-cafe-card">
            <Container className="row1">
              <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">

          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row >
          <Col className="select" sm={{ size: 2, offset: 3}}>
            <Input className="input1" type="select" innerRef={(coff) => (this.coff= coff)}>
              {roaster}
            </Input>
            </Col>
            <Col className="select" sm={{ size: 2}}>
            <Input className="input1"  type="select" innerRef={(milk) => (this.milk= milk)}>
              {milk}
            </Input>
          </Col>
            <Col className="select" sm={{ size: 2}}>
              <Button className="butt" block type="submit">Find Cafes</Button>
              </Col>
              </Row>
          </Form>
  </div></div>
          </Container>
          <Container className="row2">
  <Row >
          <Col>
            <Card className="cafelist cafelist-text">
              <div className="tab">
            <Table  size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Cafe Name</th>
            <th>Address</th>
            <th>Suburb</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {brewd}
        </tbody>
      </Table>
      </div>
      </Card>
          </Col>
        </Row>
      </Container>
      <Container className="row2">
        <Row style={{height: "100%",width: "100%", margin:"0"}}>
          <Col style={{padding: "0", overflow: "hidden"}}>
            <Map style={{height: "46vh", width: "100%"}} google={this.props.google}
              center={{lat: -37.82, lng: 144.95}}
              zoom={10}>
          {loc}
        </Map>
        </Col>
        </Row>
        </Container>
        </Card>
      </div>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    var coff = this.coff.value;
    var milk = this.milk.value;
    fetch('/api/brewd?coff='+coff+'&milk='+milk).then(function(data){
      return data.json();
    }).then(res => {this.setState({ response: res });console.log(res);})
    .catch(err => console.log(err));
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD9JHkbadijmTIImbs3SMTsMvte7bkBFaE")
})(App)
