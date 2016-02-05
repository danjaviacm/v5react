import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import is from 'is_js'
import store from 'store2'


export default class Email extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {
			invalidEmail: false
		}

		context.router
	}

	componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

	handleSubmit ( e ) {
		
		e.preventDefault()

		if ( this.checkMail() ) {

			this.continue()
		}

	}

	checkMail () {

		if ( is.email( this.refs.email_address.value.trim() ) ) {
			this.setState({ invalidEmail: false, email_address: this.refs.email_address.value.trim() }) 
			return true
		}

		else {
			this.setState({ invalidEmail: true })
			return false
		}
	}

	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.email_address = this.state.email_address

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/numeros-de-contacto' )
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
								<input autoFocus defaultValue={ this.state.email_address || '' } style={{ textAlign: 'center', color: '#777' }} onChange={ this.checkMail.bind( this ) } className="form-control" ref="email_address" name="email" type="email" placeholder="E-mail" />
							</div>
							{ this.state.invalidEmail ? <span className="block-error">Ingresa un email válido</span> : null }
						</div>
					</div>
					<br/>
					<button className="btn btn-orange upper" onClick={ this.handleSubmit.bind( this ) }>Continuar</button>
				</form>
			</div>
		)
	}
}

Email.contextTypes = {
    router: React.PropTypes.object.isRequired
}