import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class PromoCode extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
			has_promocode: 'no',
	  		invalid_promocode: false,
			valid_promocode: false,
			working: false,
			in_newsletter: true,
			terms: false,
			flag_promocode: false
	  	}
  	}

  	componentWillMount () {
  	}

    isActive ( value ) {
        return `btnuj ${ (( value === this.state.has_promocode ) ? 'active': 'default' ) }`
    }

    checkNewsletter () {
    	this.state.in_newsletter ? this.setState({ in_newsletter: false }) : this.setState({ in_newsletter: true })
    }

    checkTerms () {
    	this.state.terms ? this.setState({ terms: false }) : this.setState({ terms: true })
    }

  	checkPromo ( filter ) {

  		this.setState({ has_promocode: filter }, () => this.enableCode() )
  	}

  	enableCode () {

  		this.state.has_promocode == 'yes' ? this.setState({ flag_promocode: true }) : this.setState({ flag_promocode: false, invalid_promocode: false })
  	}

  	validatePromocode ( e ) {

  		e.preventDefault()

  		let promocode = this.refs.promocode.value.trim()

  		if ( ! promocode ) {
  			
  			alert( 'Olvidaste escribir el código promocional' )
  			return
  		}

  		Ux3Services.validatePromocode( promocode )
  			.then(( data ) => {

  				data.error ? this.setState({ invalid_promocode: true }) : null

                this.setState({ lines: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	continue ( filter ) {

  		! this.state.terms ? alert( 'Debes aceptar los términos y condiciones para realizar tu cotización.' ) : this.setState({ working: true })
  	}

  	render() {
	    return (
	    	<div id="step-promocode" className="step step-promocode">
		        <header>
		            <h1>¿Tienes un código promocional?</h1>
		        </header>
		        
		        <ul className="unstyled-list h-list centered-v-list step-promocode__list">
		            <li className="step-promocode__item">
		                <div  className={ this.isActive( 'yes' ) } onClick={ this.checkPromo.bind( this, 'yes' ) } >
		                    <span className="text">Si</span>
		                </div>
		            </li>
		            <li className="step-promocode__item">
		                <div  className={ this.isActive( 'no' ) } onClick={ this.checkPromo.bind( this, 'no' ) } >
		                    <span className="text">No</span>
		                </div>
		            </li>
		        </ul>
		        <br/>
		        
		        { this.state.flag_promocode ? <form role="form" className="form form-inline step-promocode__form" style={{ padding: 0, margin: 0 }}>
		            <div className="form-group">
		                <div className="row">
		                    <div className="col-xs-6">
		                        <input ng-disabled="valid_promocode" ref="promocode" style={{ textAlign: 'center' }} className="form-control" type="text" placeholder="Código promocional"/>
		                    </div>
		                    <div className="col-xs-2">
		                        <button className="btn btn-default" onClick={ this.validatePromocode.bind( this ) }>Consultar</button>
		                    </div>
		                </div>

		            </div>
		        </form> : null }

		        { this.state.invalid_promocode ? <div className="info-promocode step-promocode__invalid">
		            <h1>¡Código promocial inválido!</h1>
		        </div> : null }
		        
		        { this.state.valid_promocode ? <div ng-show="valid_promocode" className="info-promocode">
		            <h1>title_promocode here</h1>
		            <p className="description"> description_promocode here</p>
		            <p className="conditions" ng-bind-html="conditions_promocode"> </p>
		        </div> : null }

		        <br/>
		        
		        <div className="form-group">
		            <label>
		                <input type="checkbox" checked={ this.state.in_newsletter } onChange={ this.checkNewsletter.bind( this ) } /> <span style={{ color: '#fff', fontWeight: 'lighter' }}>Inscríbeme en el boletín de tips y noticias de ComparaMejor.com</span>
		            </label>
		        </div>

		        <div className="form-group">
		            <label>
		                <input type="checkbox" checked={ this.state.terms } onChange={ this.checkTerms.bind( this ) } /> <span style={{ color: '#fff', fontWeight: 'lighter' }}>Acepto los <a style={{ color: '#fff', textDecoration: 'underline' }} target="_blank" href="https://comparamejor.com/co/terminos-y-condiciones/">términos y condiciones</a>.</span>
		            </label>
		        </div>

		        { ! this.state.working ? <button className="btn btn-success upper" ng-hide="working" onClick={ this.continue.bind( this ) }>Cotizar</button> : null }
		        { this.state.working ? <span className="btn btn-success upper" ng-show="working"><i className="fa fa-spinner fa-spin"></i> Cotizar</span> : null }
		    </div>
	    )
  	}

}