import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Map from './components/Map'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
require('dotenv').config();

const About = () => {
  return (
    <p style={{ width: '50%', margin: '50px' }}>
      Fire Incidents includes a summary of each (non-medical) incident to which the SF Fire Department responded.
      Each incident record includes the call number, incident number, address, number and type of each unit responding,
      call type (as determined by dispatch), prime situation (field observation), actions taken, and property loss.
  
    For more information go to the official website <a href="https://data.sfgov.org/Public-Safety/Fire-Incidents/wr8u-xric" >here</a>.
  
      Click on the button to see the locations of the incidents.
    </p>
  )
}

class App extends Component {
  state = {
    initialIncidents: [],
    incidents: [],
    showOptions: false,
    map: false,
    options: [],
    battalion: []
  }

  async componentDidMount() {
    const res = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
      params: {
        "$limit": 500,
        "$$app_token": process.env.APP_TOKEN
      }
    })

    const incidents = res.data;
    this.getOptions(incidents)
    this.setState({ initialIncidents: incidents, incidents: incidents });
  };

  getMap = () => {
    this.setState({ map: true, showOptions: true });
    console.log(this.state.incidents)
  }

  handleChange = (e) => {
    const items = this.state.initialIncidents.filter(incident => incident['zip_code'] === e.target.value)
    this.setState({ incidents: items })
  }

  handleChangeBattalion = (e) => {
    const items = this.state.initialIncidents.filter(incident => incident['battalion'] === e.target.value)
    this.setState({ incidents: items })
  }

  getOptions = (incidents) => {
    incidents.map(incident => {
      if (!this.state.options.includes(incident['zip_code'])) {
        this.state.options.push(incident['zip_code'])
      }

      if (!this.state.battalion.includes(incident['battalion'])) {
        this.setState({ battalion: [...this.state.battalion, ...[incident['battalion']]] })
      }

    })
  }

  
  render() {
    return (
      <div style={{ margin: '15px' }}>
        <h1 style={{ display: 'inline-block' }}> San Francisco Fire Incidents</h1>
        <Button color="info" onClick={this.getMap} style={{ float: 'right' }}> Get Map</Button>

        <div id="main">
          {this.state.showOptions ? <div style={{ width: '100%', overflow: 'scroll', marginRight: '2px', display: 'inline-block' }}>
            <Fragment>
              <Form>
              <Row form>
        <Col md={6}>
          <FormGroup>
          <Label for="Zip-Code">Filter by Zip Codes</Label>
                  <Input type="select" name="select" id="Zip-Code" value={this.state.value} onChange={this.handleChange}>
                    {this.state.options.map(option => (
                      <option value={option} key={option}>{option}</option>
                    ))}
                  </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          <Label for="Battalion">Filter by Battalion</Label>
                  <Input type="select" name="select" id="Battalion" value={this.state.value} onChange={this.handleChangeBattalion}>
                    {this.state.battalion.map((battalion, i) => (
                      <option value={battalion} key={i}>{battalion}</option>
                    ))}
                  </Input>
          </FormGroup>
        </Col>
      </Row>
      
            
              </Form>

            </Fragment>
          </div> : <About />}

          {
            this.state.map ? <Map incidents={this.state.incidents}/> : ''
          }
        </div>
      </div>
    );
  }
}

export default App;
