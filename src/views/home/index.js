import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
          <div>this is home page</div>
          <Link to='/other'>Link</Link>
      </div>
    );
  }
}

export default Home;