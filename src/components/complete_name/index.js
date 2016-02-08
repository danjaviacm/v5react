import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import $ from 'jquery'
import _ from 'lodash'
import store from 'store2'


export default class CompleteName extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: '',
            errorFirst: false,
            errorSocial: false,
            errorLast: false,
            first_name: '',
            last_name: ''
	  	}

	  	context.router
  	}

    componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

  	componentDidMount () {

        $( '.firstname' ).keydown( ( e ) => {

            if ( e.keyCode != 8 ) {

                let regex = new RegExp( "^[a-zA-Z0-9]+$" )
                let key = String.fromCharCode( ! e.charCode ? e.which : e.charCode )

                if ( ! regex.test( key ) ) {
                    e.preventDefault()
                    return false
                }
            }
        })

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

        let nameOrSocial = this.refs.firstname.value.trim()

        // Validate socialName
        if ( nameOrSocial.length < 3 && this.state.identification_type == 'nit' )
            this.setState({ errorSocial: true }) 
        
        // Validate name
        else if ( this.state.identification_type != 'nit' ) {

            let lastname = this.refs.lastname.value.trim()

            // Validate name
            nameOrSocial.length < 3 ? 
                this.setState({ errorFirst: true }) : this.setState({ errorFirst: false })
            

            // Validate lastname
            lastname.length < 3 ?
                this.setState({ errorLast: true }) : this.setState({ errorLast: false }, () => this.continue() )
        }

        else
            this.setState({ errorSocial: false }, () => this.continue() )

    }

  	continue ( filter ) {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_service_type = this.state.vehicle_service_type
            UJData.first_name = this.refs.firstname.value.trim()
            UJData.last_name = this.refs.lastname ? this.refs.lastname.value.trim() : ''
            UJData.sex = 'M'

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.state.identification_type == 'nit' ? this.context.router.push( '/fecha-de-nacimiento' ) : this.context.router.push( '/sexo' )
  	}

  	render() {

	    return (
	    	<div id="step-complete-name" className="step step-complete-name">
                { this.state.identification_type == 'nit' ? <header>
                    <h1>Razón social</h1>
                </header> : null }
                <form className="step-complete-name__form" onSubmit={ this.handleSubmit.bind( this ) }>
                    { this.state.identification_type != 'nit' ? <h2 style={{ marginTop: '34px' }}>Tu nombre</h2> : null } 
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                <input autoFocus ref="firstname" defaultValue={ this.state.first_name || null } style={{ textAlign: 'center', color: '#777' }} className="form-control firstname" type="text" placeholder="Nombre"></input>
                                { this.state.errorFirst ? <span className="block-error">Debes ingresar tu nombre.</span> : null }
                                { this.state.errorSocial ? <span className="block-error">Debes ingresar la razón social de tu empresa.</span> : null }
                            </div>
                        </div>
                    </div>
                    { this.state.identification_type != 'nit' ? <h2 ng-if="identification_type != 'nit'">Tu apellido</h2> : null }
                    { this.state.identification_type != 'nit' ? <div ng-if="identification_type != 'nit'" className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                <input ref="lastname" defaultValue={ this.state.last_name || null } style={{ textAlign: 'center', color: '#777' }} className="form-control lastname" type="text" placeholder="Apellido"/>
                                { this.state.errorLast ? <span className="block-error">Debes ingresar tu apellido.</span> : null }
                            </div>
                        </div>
                    </div> : null }
                    <button className="btn btn-orange upper" onClick={ this.handleSubmit.bind( this ) }>Continuar</button>
                </form>
            </div>
	    )
  	}
}

CompleteName.contextTypes = {
    router: React.PropTypes.object.isRequired
}