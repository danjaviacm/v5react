import React, { Component } from 'react'

export default class Loading extends Component {
  	
  	constructor ( props ) {
	  	
	  	super( props )

	  	this.state = {}
  	}

  	render() {
	    return (
	    	<div className="loading-uj hidden-xs" show="loadingUj">
				<i className="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Procesando...
			</div>
	    );
  	}

}