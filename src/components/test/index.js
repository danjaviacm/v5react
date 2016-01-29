import React, { Component } from 'react';

// Other dependencies

// Needed Components
import Footer from '../footer'

export default class Test extends Component {

  constructor ( props ) {
  	super( props );
  	this.state = {};
  }

  render() {
    return (
    	<div>
    		Hello World!
    		<Footer />
    	</div>
    );
  }

}