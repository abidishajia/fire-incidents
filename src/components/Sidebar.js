import React, { Component } from 'react';

class Sidebar extends Component {

  state = {
    value: 'Ford'
  }
  
  handleChange = (e) => {
    this.setState({ valuev: e.target.value })
  }

  render() {
    return (
      <div style={{ width: '20%', height: '900px', display: 'inline-block', overflow: 'scroll', marginRight: '2px' }}>

        <form>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Sidebar;