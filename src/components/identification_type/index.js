import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class IdentificationType extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		selected: ''
	  	}

	  	context.router
  	}

  	isActive ( value ) {
    	return `btnuj btn-icon-content ${ (( value === this.state.selected ) ? 'active': 'default' ) }`
  	}

    selectOption ( option ) {

    }

  	componentWillMount () {

  	}

  	continue ( filter ) {

  		this.setState({ selected: filter })
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
                        <div className={ this.isActive( 'cedula' ) } onClick={ this.continue.bind( this, 'cedula' ) }>
                            <span className="icon"><i className="cmuj-identification1"></i></span>
                            <span className="text">Cédula de ciudadanía</span>
                        </div>
                    </li>
                    <li className="step-identification-type__item">
                        <div className={ this.isActive( 'cedula_extranjeria' ) } onClick={ this.continue.bind( this, 'cedula_extranjeria' ) }>
                            <span className="icon"><i className="cmuj-identification2"></i></span>
                            <span className="text">Cédula de extranjería</span>
                        </div>
                    </li>
                    <li className="step-identification-type__item">
                        <div className={ this.isActive( 'pasaporte' ) } onClick={ this.continue.bind( this, 'pasaporte' ) }>
                            <span className="icon"><i className="cmuj-passport"></i></span>
                            <span className="text">Pasaporte</span>
                        </div>
                    </li>
                    <li className="step-identification-type__item">
                        <div className={ this.isActive( 'nit' ) } onClick={ this.continue.bind( this, 'nit' ) }>
                            <span className="icon"><i className="cmuj-sheet"></i></span>
                            <span className="text">NIT</span>
                        </div>
                    </li>
                </ul>
            </div>
	    )
  	}

}