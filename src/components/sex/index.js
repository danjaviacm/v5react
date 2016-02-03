import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class Sex extends Component {

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
	    	<div id="step-sex" className="step step-sex">
                <header>
                    <h1>Sexo</h1>
                </header>
                <ul className="unstyled-list h-list centered-v-list step-sex__list">
                    <li className="step-sex__item">
                        <div className={ this.isActive( 'M' ) } onClick={ this.continue.bind( this, 'M' ) }>
                            <span className="icon"><i className="cmuj-male"></i></span>
                            <span className="text">Masculino</span>
                        </div>
                    </li>
                    <li className="step-sex__item">
                        <div className={ this.isActive( 'F' ) } onClick={ this.continue.bind( this, 'F' ) }>
                            <span className="icon"><i className="cmuj-female"></i></span>
                            <span className="text">Femenino</span>
                        </div>
                    </li>
                </ul>
            </div>
	    )
  	}

}