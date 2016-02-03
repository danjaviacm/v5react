import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import $ from 'jquery'
import _ from 'lodash'


export default class CompleteName extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: 'cedula',
            errorFirst: false,
            errorSocial: false,
            errorLast: false
	  	}

	  	context.router
  	}

  	componentDidMount () {

        $( '.lastname' ).keydown( ( e ) => {

            if ( e.keyCode != 8 ) {

                let regex = new RegExp( "^[a-zA-Z]+$" )
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

        let nameOrSocial = this.refs.name.value.trim()
        let lastname = this.refs.lastname.value.trim()

  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-complete-name" className="step step-complete-name">
                { this.state.identification_type == 'nit' ? <header>
                    <h1>Razón social</h1>
                </header> : null }
                <form className="step-complete-name__form" onSubmit={ this.continue.bind( this ) }>
                    { this.state.identification_type != 'nit' ? <h2 style={{ marginTop: '34px' }}>Tu nombre</h2> : null } 
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                <input autoFocus ref="firstname" style={{ textAlign: 'center', color: '#777' }} className="form-control" type="text" placeholder="Nombre"></input>
                                { this.state.errorFirst ? <span className="block-error">Debes ingresar tu nombre.</span> : null }
                                { this.state.errorSocial ? <span className="block-error">Debes ingresar la razón social de tu empresa.</span> : null }
                            </div>
                        </div>
                    </div>
                    { this.state.identification_type != 'nit' ? <h2 ng-if="identification_type != 'nit'">Tu apellido</h2> : null }
                    { this.state.identification_type != 'nit' ? <div ng-if="identification_type != 'nit'" className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                <input ref="lastname" style={{ textAlign: 'center', color: '#777' }} className="form-control lastname" type="text" placeholder="Apellido"/>
                                { this.state.errorLast ? <span className="block-error">Debes ingresar tu apellido.</span> : null }
                            </div>
                        </div>
                    </div> : null }
                    <button className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button>
                </form>
            </div>
	    )
  	}

}