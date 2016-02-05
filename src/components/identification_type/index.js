import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class IdentificationType extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {
			identification_type: '',
			vehicle_accessories_value: '',
			client_type: ''
		}

		context.router
	}

	componentWillMount () {

		store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
	}

  	isActive ( value ) {
    	return `btnuj btn-icon-content ${ (( value === this.state.identification_type ) ? 'active': 'default' ) }`
  	}

    selectChoice ( filter ) {
        this.setState({ identification_type: filter }, () => this.continue() )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.identification_type = this.state.identification_type
            UJData.vehicle_accessories_value = 0
            UJData.client_type = this.state.identification_type == 'nit' ? 'juridica' : 'natural'

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/identificacion' )
  	}

	render() {

		return (
			<div id="step-identification-type" className="step step-identification-type">
				<header>
					<h1>¿Qué tipo de identificación tienes?</h1>
					<h3 style={{ marginTop: '-34px', marginBottom: '34px' }}>Esta información nos permitirá conocer si eres elegible para descuentos especiales.</h3>
				</header>
				<ul className="unstyled-list h-list centered-v-list step-identification-type__list">
					<li className="step-identification-type__item">
						<div className={ this.isActive( 'cedula' ) } onClick={ this.selectChoice.bind( this, 'cedula' ) }>
							<span className="icon"><i className="cmuj-identification1"></i></span>
							<span className="text">Cédula de ciudadanía</span>
						</div>
					</li>
					<li className="step-identification-type__item">
						<div className={ this.isActive( 'cedula_extranjeria' ) } onClick={ this.selectChoice.bind( this, 'cedula_extranjeria' ) }>
							<span className="icon"><i className="cmuj-identification2"></i></span>
							<span className="text">Cédula de extranjería</span>
						</div>
					</li>
					<li className="step-identification-type__item">
						<div className={ this.isActive( 'pasaporte' ) } onClick={ this.selectChoice.bind( this, 'pasaporte' ) }>
							<span className="icon"><i className="cmuj-passport"></i></span>
							<span className="text">Pasaporte</span>
						</div>
					</li>
					<li className="step-identification-type__item">
						<div className={ this.isActive( 'nit' ) } onClick={ this.selectChoice.bind( this, 'nit' ) }>
							<span className="icon"><i className="cmuj-sheet"></i></span>
							<span className="text">NIT</span>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

IdentificationType.contextTypes = {
    router: React.PropTypes.object.isRequired
}