import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

// Additional components
import Brand from '../brand'

export default class VehicleBrand extends Component {
  
	constructor ( props ) {

		super( props )
		
		this.state = {
			brands: [],
			alphabeticalList: [],
			popular_brands: [],
			showMore: false,
			vehicle_brand: ''
		}

		this.fetchBrands = this.fetchBrands.bind( this )
	
	}

	fetchBrands () {

		let popular_brands = []
		let alphabeticalList = []

		Ux3Services.getBrandsByBody( this.state.vehicle_body )
			.then(( data ) => {

				this.setState({ brands: data })

				// Populate poular brands
				_.each( data, ( value, key ) => {

					if ( ! _.some( alphabeticalList, { 'al': value.name.substring( 0, 1 ) } ) ) {
						alphabeticalList.push({ al: value.name.substring( 0, 1 ), brands: [] })
					}

					if ( value.is_popular )
						popular_brands.push( value )
				})

				// set childs for object
				_.each( data, ( value, key ) => {
					_.each( alphabeticalList, ( alitem, key ) => {
						if ( alitem.al == value.name.substring( 0, 1 ) )
							alitem.brands.push( value )
					})
				})

				// Populate popular brands
				this.setState({
					popular_brands: popular_brands,
					alphabeticalList: alphabeticalList
				})

			}).catch(( error ) => {
				trackJs.track( JSON.stringify( error ))
				console.log( error )
			})
	}

	showMore ( e ) {
		e.preventDefault()

		this.setState({ showMore: true })
	}

	componentWillMount () {

		store.has( 'UJDATA' ) ?
			this.setState( JSON.parse( store.get( 'UJDATA' ) ), () => this.fetchBrands() ) : this.context.router.push( '/consultar-placa' )
	
	}

	isActive ( value ) {
		return `btnuj ${ (( value === this.state.vehicle_brand ) ? 'active': 'default' ) }`
	}

	selectChoice ( filter ) {
		this.setState({ vehicle_brand: filter }, () => this.continue() )
	}

	continue () {

		let UJData = {}

		if ( store.has( 'UJDATA' ) ) {

			UJData = JSON.parse( store.get( 'UJDATA' ) ) 
			UJData.vehicle_brand = this.state.vehicle_brand

			store.set( 'UJDATA', JSON.stringify( UJData ) )
		}

		else
			this.context.router.push( '/consultar-placa' )

		// Next step
		this.context.router.push( '/modelo-vehiculo' )

	}

	render() {

		return (
			<div id="step-vehicle-brand" className="step">

				<header>
					<h1>¿Cuál es la marca de tu vehículo?</h1>
				</header>

				{/* Brand images */}
				{ ! this.state.showMore ? <div className="brands">

					{ this.state.brands.map( ( brand, key ) => {
						return <Brand brand={ brand } key={ key } />
					})}

					<div className="brand more" onClick={ this.showMore.bind(this) }>
						<span>+</span>
					</div>
				</div> : null }

				{/* Brands list */}
				{ this.state.showMore ? <div className="list-brands">

					{ this.state.alphabeticalList.map( ( collection, key ) => {
						return <div className="letter" key={ key }>
							<h1 style={{ borderBottom: '1px dotted rgba( 255, 255, 255, .2 )' }}>{ collection.al }</h1>
							<ul className="unstyled-list v-list list-brands__list">
								
								{ collection.brands.map( ( brand, key ) => {
									return <li key={ key } className="list-brands__item">
										<span className={ this.isActive( brand.name ) } onClick={ this.selectChoice.bind( this, brand.name ) }>
											<span className="text">{ brand.name }</span>
										</span>
									</li>
								})}

							</ul>
						</div>
					})}

				</div> : null } 
			</div>
		)
	}
}

VehicleBrand.contextTypes = {
	router: React.PropTypes.object.isRequired
}