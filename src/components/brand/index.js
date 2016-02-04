import React from 'react'

export default class Brand extends React.Component {

  	constructor ( props, context ) {

	  	super( props )

	  	this.state = {}

	  	this.urlMediaBase = 'https://segdig1.s3.amazonaws.com'
  	}

  	render() {
  		
	    return (
	    	<div className="brand" key={ this.props.key }>
                <div className="container-img">
                    <img src={ this.props.brand.image } alt={ this.props.brand.name } className="img-responsive"/>
                </div>
                <span>{ this.props.brand.name }</span>
            </div>
	    )
  	}
}