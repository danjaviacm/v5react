import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import $ from 'jquery'
import _ from 'lodash'


export default class Identification extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identificationType: 'cedula',
            showError: false
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

    handleSubmit ( e ) {
        
        e.preventDefault()

        let identificationReference = this.refs.identification.value
 
        identificationReference.length < 7 || parseInt( identificationReference ) == 0 ? this.setState({ showError: true }) : this.setState({ showError: false })

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
                <form name="_form" className="step-identification__form" onSubmit={ this.handleSubmit.bind( this ) }>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                { identificationType ? <input autoFocus ref="identification" style={{ textAlign: 'center', color: '#777' }} className="form-control upper identification" type="text" placeholder="Número de identificación" pattern="[0-9]{5,12}" maxLength="12" /> : null }
                                { ! identificationType ? <input autoFocus ref="identification" style={{ textAlign: 'center', color: '#777' }} className="form-control upper externalIdentification" type="text" placeholder="Número de identificación" pattern="[a-zA-Z0-9]{5,12}" maxLength="12" /> : null }
                                { this.state.showError ? <span className="block-error" >{ this.state.identificationType == 'nit' ? 'Debes ingresar una identificación válida, sin dígito de verificación.' : 'Debes ingresar una identificación válida.' }</span> : null }
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-orange upper">Continuar</button>
                </form>
            </div>
	    )
  	}

}