import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import $ from 'jquery'
import _ from 'lodash'
import is from 'is_js'


export default class Email extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: 'cedula',
            invalidEmail: false
	  	}

	  	context.router
  	}

  	componentDidMount () {

  	}

    checkMail () {
        is.email( this.refs.email_address.value.trim() ) ? 
            this.setState({ invalidEmail: false }) : this.setState({ invalidEmail: true })
    }

  	continue ( e, filter ) {

        e.preventDefault()

        this.checkMail()

  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-email-address" className="step step-email-address">
                <header>
                    <h1>¿A qué correo electrónico enviamos la cotización?</h1>
                </header>
                <form className="step-email-address__form">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                            <div className="input-group">
                                <div className="input-group-addon"><i className="cmuj-letter"></i></div>
                                <input autoFocus style={{ textAlign: 'center', color: '#777' }} onChange={ this.checkMail.bind( this ) } className="form-control" ref="email_address" name="email" type="email" placeholder="E-mail" />
                            </div>
                            { this.state.invalidEmail ? <span className="block-error">Ingresa un email válido</span> : null }
                        </div>
                    </div>
                    <br/>
                    <button className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button>
                </form>
            </div>
	    )
  	}

}