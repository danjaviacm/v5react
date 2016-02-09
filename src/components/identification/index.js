import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import $ from 'jquery'
import _ from 'lodash'
import store from 'store2'


export default class Identification extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {
			identification_type: 'cedula',
			showError: false,
		}

		context.router
	}

	componentDidMount () {

		$( '.identification' ).keydown( ( key ) => {
			if ( key.keyCode != 8 && ( key.keyCode < 48 || key.keyCode > 57 ) ) return false
		})

		$( '.externalIdentification' ).keydown( ( e ) => {

			if ( e.keyCode != 8 ) {

				let regex = new RegExp( "^[a-zA-Z0-9]+$" )
				let key = String.fromCharCode( ! e.charCode ? e.which : e.charCode )

				if ( ! regex.test( key ) ) {
					e.preventDefault()
					return false
				}
			}
		})
	}

	generateDv ( nit ) {

		let vpri, x, y, z, i, dv1

		vpri = new Array( 16 )
        
        x = y = 0
        z = nit.toString().length

        vpri[ 1 ] = 3
        vpri[ 2 ] = 7
        vpri[ 3 ] = 13
        vpri[ 4 ] = 17
        vpri[ 5 ] = 19
        vpri[ 6 ] = 23
        vpri[ 7 ] = 29
        vpri[ 8 ] = 37
        vpri[ 9 ] = 41
        vpri[ 10 ] = 43
        vpri[ 11 ] = 47
        vpri[ 12 ] = 53
        vpri[ 13 ] = 59
        vpri[ 14 ] = 67
        vpri[ 15 ] = 71

        for( i = 0 ; i < z ; i++ ) {

            y = ( nit.substr( i,1 ) )
            x += ( y * vpri[ z - i ] )
        }
        
        y = x % 11

        if ( y > 1 ) {
            dv1 = 11 - y
        } else {
            dv1 = y
        }

        return dv1
	}

	handleSubmit ( e ) {
		
		e.preventDefault()

		let identificationReference = this.refs.identification.value
 
		identificationReference.length < 7 || parseInt( identificationReference ) == 0 ? this.setState({ showError: true }) : this.setState({ showError: false }, () => this.continue() )

	}

	componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_service_type = this.state.vehicle_service_type
            UJData.identification_verification_digit = this.state.identification_type == 'nit' ? this.generateDv( this.refs.identification.value ) : ''
			UJData.identification = this.refs.identification.value

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/nombre-completo' )
  	}

	render() {

		let identification_type = /(nit|cedula)$/g.test( this.state.identification_type )

		return (
			<div id="step-identification" className="step step-identification">
				<header>
					<h1>¿Cuál es tu número de identificación?</h1>
					<h3 style={{ marginTop: '-34px', marginBottom: '34px' }}>Esta información nos permitirá conocer si eres elegible para descuentos especiales.</h3>
				</header>
				<form name="_form" className="step-identification__form" onSubmit={ this.handleSubmit.bind( this ) }>
					<div className="form-group">
						<div className="row">
							<div className="col-xs-6 col-xs-offset-3">
								{ identification_type ? <input autoFocus ref="identification" defaultValue={ this.state.identification || null } style={{ textAlign: 'center', color: '#777' }} className="form-control upper identification" type="tel" placeholder="Número de identificación" pattern="[0-9]{5,12}" maxLength="12" /> : null }
								{ ! identification_type ? <input autoFocus ref="identification" defaultValue={ this.state.identification || null } style={{ textAlign: 'center', color: '#777' }} className="form-control upper externalIdentification" type="text" placeholder="Número de identificación" pattern="[a-zA-Z0-9]{5,12}" maxLength="12" /> : null }
								{ this.state.showError ? <span className="block-error" >{ this.state.identification_type == 'nit' ? 'Debes ingresar una identificación válida, sin dígito de verificación.' : 'Debes ingresar una identificación válida.' }</span> : null }
							</div>
						</div>
					</div>
					<button className="btn btn-orange upper" onClick={ this.handleSubmit.bind( this ) }>Continuar</button>
				</form>
			</div>
		)
	}
}

Identification.contextTypes = {
    router: React.PropTypes.object.isRequired
}