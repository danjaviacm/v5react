import React, { Component } from 'react';

export default class App extends Component {

  constructor ( props, context ) {

  	super( props )

  	this.state = {}
  	
  }

  render() {
    return (
    	<div>
    		{ this.props.children }
    	</div>
    );
  }
}