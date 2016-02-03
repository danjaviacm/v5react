import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import $ from 'jquery'
import _ from 'lodash'
import is from 'is_js'


export default class ContactNumbers extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: 'cedula',
            errorMobile: false,
            errorHome: false,
            errorOffice: false,
            errorEmpty: false
	  	}

	  	context.router
  	}

  	componentDidMount () {

        $( '.cel, .phone, .office_phone' ).keydown( ( key ) => {
            if ( key.keyCode != 8 && ( key.keyCode < 48 || key.keyCode > 57 ) ) return false
        })

  	}

    checkPhone() {

        let mobilePhone = this.refs.mobile_phone.value.trim()
        let phone = this.refs.phone.value.trim()
        let officePhone = this.refs.office_phone.value.trim()

        // validate all fields for not empty
        is.all.empty( mobilePhone, phone, officePhone ) ? 
            this.setState({ errorEmpty: true }) : this.setState({ errorEmpty: false })

        // validate mobile phone
        is.not.empty( mobilePhone ) && mobilePhone.length < 10 ? 
            this.setState({ errorMobile: true }) : this.setState({ errorMobile: false })

        // validate phone
        is.not.empty( phone ) && phone.length < 7 ? 
            this.setState({ errorHome: true }) : this.setState({ errorHome: false })

        // validate office phone
        is.not.empty( officePhone ) && officePhone.length < 7 ? 
            this.setState({ errorOffice: true }) : this.setState({ errorOffice: false })
    }

  	continue ( e, filter ) {

        e.preventDefault()

        this.checkPhone()

  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-phone-numbers" className="step step-phone-numbers">
                <header>
                    <h1>Números telefónicos</h1>
                    <h3 style={{ marginTop: '-34px', marginBottom: '34px' }}>Escribe por lo menos un número de contacto.</h3>
                </header>
                { this.state.errorEmpty ? <span className="block-error">*Recuerda que debes ingresar al menos un número de contacto.</span> : null }
                <form className="step-phone-numbers__form">
                    <div className="row">
                        <div className="col-xs-8 col-xs-offset-2">
                            <dl className="dl-horizontal">
                                <dt className="iconuj hidden-xs"><i className="cmuj-mobile"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="mobile_phone">Celular</label>
                                    <input autoFocus ref="mobile_phone" name="mobile_phone" maxLength="10" id="mobile_phone" style={{ textAlign: 'center', color: '#777' }} className="form-control cel" type="text" onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorMobile ? <span className="block-error" ng-show="errorMobile">El número de celular debe tener al menos 10 caracteres.</span> : null }
                                </dd>
                                <dt className="iconuj hidden-xs"><i className="cmuj-home"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="phone">Casa</label>
                                    <input id="phone" ref="phone" style={{ textAlign: 'center', color: '#777' }} maxLength="7" className="form-control phone" type="text" onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorHome ? <span className="block-error" ng-show="errorHome">El teléfono de casa debe tener al menos 7 caracteres.</span> : null }
                                </dd>
                                <dt className="iconuj hidden-xs"><i className="cmuj-telephone"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="office_phone">Oficina</label>
                                    <input id="office_phone" ref="office_phone" style={{ textAlign: 'center', color: '#777' }} maxLength="7" className="form-control office_phone" type="text"  onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorOffice ? <span className="block-error" ng-show="errorOffice">El teléfono de oficina debe tener al menos 7 caracteres.</span> : null }
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <button className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button>
                </form>
            </div>
	    )
  	}

}