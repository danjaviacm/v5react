import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import InputElement from 'react-input-mask'
import _ from 'lodash'


export default class Identification extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		selected: '',
            identificationType: 'cedula_extranjeria'
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

        let identificationType = /(nit|cedula)$/g.test( this.state.identificationType )

	    return (
	    	<div id="step-identification" className="step step-identification">
                <header>
                    <h1>¿Cuál es tu número de identificación?</h1>
                    <h3 style={{ marginTop: '-34px', marginBottom: '34px' }}>Esta información nos permitirá conocer si eres elegible para descuentos especiales.</h3>
                </header>
                <form name="_form" className="step-identification__form">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                { identificationType ? <InputElement {...this.props} className="form-control upper" autoFocus style={{ textAlign: 'center', color: '#777' }} placeholder="Número de identificación" maxLength="12" mask="999999999999" maskChar=""/> : null }
                                { ! identificationType ? <input autoFocus style={{ textAlign: 'center', color: '#777' }} className="form-control upper" type="text" placeholder="Número de identificación" pattern="[a-zA-Z0-9]{5,12}" maxLength="12" /> : null }
                                <span className="block-error" ng-show="errorId">Debes ingresar una identificación.</span>
                            </div>
                        </div>
                    </div>
                <button className="btn btn-orange upper" ng-click="continue()">Continuar</button>
                </form>
            </div>
	    )
  	}

}