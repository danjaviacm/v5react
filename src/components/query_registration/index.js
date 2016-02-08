import React, { Component } from 'react'
import Ux3Services from '../../services/Ux3Services'
import store from 'store2'
import $ from 'jquery'
import is from 'is_js'

// Needed Components

export default class QueryRegistration extends Component {

  	constructor ( props, context ) {
  		
  		super( props )

  		this.state = {
            loadingUj: false,
            errorEmpty: false,
            errorLength: false
        }
  	}

    componentDidMount () {

        $( '#plate' ).keydown( ( e ) => {

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

    continue( e ) {

        e.preventDefault()

        let plate = this.refs.plate.value.trim()

        if ( is.empty( plate ) ) {
            this.setState({ errorEmpty: true, errorLength: false })
            return
        }

        if ( plate.length < 5 ) {
            this.setState({ errorLength: true, errorEmpty: false })
            return
        }

        this.setState({ loadingUj: true, errorLength: false, errorEmpty: false })

        globalState.callback({ serverWait: true, arrow: true })

        Ux3Services.getInfoHidden( plate )
            .then(( data ) => {

                // Initialize data
                let UJData = {}

                // Get plate and start process
                UJData.vehicle_registration = plate.toUpperCase()
                UJData.vehicle_has_registration = true

                if ( data.success ) {

                    UJData.from_hack = true
                    UJData.vehicle_brand = data.brand
                    UJData.vehicle_model = data.year
                    UJData.vehicle_line = data.line
                    UJData.vehicle_reference = data.reference
                    UJData.fasecolda_code = data.fasecolda
                    UJData.vehicle_body = data.body_alias

                    if ( data.body_alias == 'MOTO' )
                        UJData.vehicle_service_type = 'particular'

                    if ( data.body_alias == 'PESADO' )
                        UJData.vehicle_service_type = 'publico'

                    globalState.callback({ serverWait: false })

                    store.set( 'UJDATA', JSON.stringify( UJData ) )

                    this.context.router.push( '/ubicacion-vehiculo' )
                }

                else {

                    UJData.from_hack = false

                    store.set( 'UJDATA', JSON.stringify( UJData ) )

                    globalState.callback({ serverWait: false })

                    this.context.router.push( '/tipo-vehiculo' )
                }


            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
    }

    noPlate () {

        // Initialize data
        let UJData = {}

        // Remove previous data 
        if ( store.has( 'UJDATA' ) )
            store.remove( 'UJDATA' )

        // Get plate and start process
        UJData.vehicle_registration = 'SINPLA'
        UJData.vehicle_has_registration = false

        store.set( 'UJDATA', JSON.stringify( UJData ) )

        this.context.router.push( '/tipo-vehiculo' )

        globalState.callback({ arrow: true })
    }

  	render() {
    	return (
    		<section id="step-query-registration" className="step step-query-registration">
            	<div className="row ptgw-2x">
                	<div className="col-xs-12 col-md-6 ta-right step-query-registration__message">
                    	<span className="bebas upper">Cotiza gratis</span><br/>
                    	<span className="bebas upper palid-yellow">tu seguro todo riesgo</span><br/>
                    	<span className="bebas upper palid-yellow">en segundos</span>
                	</div>

                	<div className="col-xs-12 col-md-4 ta-left step-query-registration__form">
                    	<span>Ingresa tu placa</span> <br/>

                    	<form action="#/consultar-placa" method="post" className="step-query-registration__form-registration" id="form-registration" onSubmit={ this.continue.bind( this ) }>
                        	{/*{% csrf_token %}*/}
                            <input autoFocus name="vehicle_registration" ref="plate" id="plate" maxLength="6" placeholder="XXX000" type="text"/><br/>
                            { this.state.errorEmpty ? <span className="block-error errorPlate" >Este campo no puede estar vacio.</span> : null }
                        	{ this.state.errorLength ? <span className="block-error errorPlate" >Escribe una placa válida.</span> : null }
                            { ! this.state.loadingUj ? <button type="submit" className="btn btn-orange btn-lg upper" onClick={ this.continue.bind( this ) }>Continuar</button> : null }
                    	</form>

                    	{ this.state.loadingUj ? <span className="btn btn-orange btn-lg upper"><i className="fa fa-spinner fa-spin"></i> Continuar</span> : null }
                	</div>

                	<div className="col-xs-12 step-query-registration__success">
                    	<br/>
                    	<a className="btn btn-success" onClick={ this.noPlate.bind( this ) } style={{ color: '#fff' }}>Cotizar vehículo sin placa</a><br/>
                	</div>
            	</div>
	            <div style={{ clear: 'both' }}></div>
	        </section>
    	)
  	}
}

QueryRegistration.contextTypes = {
    router: React.PropTypes.object.isRequired
}