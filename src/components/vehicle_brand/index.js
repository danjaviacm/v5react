import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash';

import Brand from '../brand';

export default class VehicleBrand extends Component {
  
  	constructor ( props ) {

    	super( props )
    	
    	this.state = {
    		brands: [],
    		alphabeticalList: [],
    		popular_brands: [],
    		showMore: false
    	}

    	this.fetchBrands = this.fetchBrands.bind( this )
  	
  	}

  	fetchBrands () {

  		let popular_brands = []
  		let alphabeticalList = []

  		Ux3Services.getBrandsByBody( 'AUTOMOVIL' )
	  		.then((data) => {

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

                // Populate poular brands
                this.setState({
        			popular_brands: popular_brands,
        			alphabeticalList: alphabeticalList
        		})

            }).catch((error) => {
                trackJs.track(JSON.stringify(error))
                console.log(error)
            })
  	}

  	showMore ( e ) {
  		e.preventDefault()

  		this.setState({ showMore: true })
  	}

  	componentDidMount () {

  		// Get all brands
		this.fetchBrands()  	
  	}

  	render() {

	    return (
	     	<div id="step-vehicle-brand" className="step">
		        <header>
		            <h1>¿Cuál es la marca de tu vehículo?</h1>
		        </header>

		    	{/* Brand images */}
		        { ! this.state.showMore ? <div className="brands" ng-hide="list">

		            { this.state.popular_brands.map( ( brand, key ) => {
		            	if ( brand.is_popular && key < 15 )
		            		return <Brand brand={ brand } key={ key } />
		            })}

		            <div className="brand more" ng-show="loadMoreBtn" onClick={ this.showMore.bind(this) }>
		                <span>+</span>
		            </div>
		        </div> : null }

		    	{/* Brands list */}
		        { this.state.showMore ? <div className="list-brands" ng-show="list">

		            { this.state.alphabeticalList.map( ( collection, key ) => {
		            	return <div className="letter" ng-repeat="letter in alphabeticalList" key={ key }>
			                <h1 style={{ borderBottom: '1px dotted rgba( 255, 255, 255, .2 )' }}>{ collection.al }</h1>
			                <ul className="unstyled-list v-list">
				                { collection.brands.map( ( brand, key ) => {
				                	return <li ng-repeat="brand in letter.brands" key={ key }>
				                        <span className="btnuj" ng-className="" ng-click="">
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