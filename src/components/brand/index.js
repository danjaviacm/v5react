import React from 'react'
import store from 'store2'

export default class Brand extends React.Component {

  	constructor ( props, context ) {

	  	super( props )

	  	this.state = {
            vehicle_brand: ''
        }

	  	this.urlMediaBase = 'https://segdig1.s3.amazonaws.com'
  	}

    componentWillMount () {

        let UJData = JSON.parse( store.get( 'UJDATA' ) )
        
        if ( UJData.vehicle_brand ) 
            this.setState({ vehicle_brand: UJData.vehicle_brand })
    
    }

    isActive ( value ) {
        return `brand ${ (( value === this.state.vehicle_brand ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ vehicle_brand: filter }, () => this.continue() )
    }

    continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_brand = this.state.vehicle_brand

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else {

            UJData.vehicle_brand = this.state.vehicle_brand

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        this.context.router.push( '/modelo-vehiculo' )

    }

  	render() {
  		
	    return (
	    	<div className={ this.isActive( this.props.brand.name ) } key={ this.props.key } onClick={ this.selectChoice.bind( this, this.props.brand.name ) }>
                <div className="container-img">
                    <img src={ this.props.brand.image } alt={ this.props.brand.name } className="img-responsive"/>
                </div>
                <span>{ this.props.brand.name }</span>
            </div>
	    )
  	}
}

Brand.contextTypes = {
    router: React.PropTypes.object.isRequired
}