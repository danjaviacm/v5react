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
    		popular_brands: []
    	}

    	this.fetchBrands = this.fetchBrands.bind( this )
  	
  	}

  	fetchBrands () {

  		let popular_brands = []

  		Ux3Services.getBrandsByBody( 'AUTOMOVIL' )
	  		.then((data) => {

                this.setState({ brands: data })

                _.each( data, ( value, key ) => {
                	if ( value.is_popular )
                		popular_brands.push( value )
                })

                this.setState({
        			popular_brands: popular_brands
        		})

            }).catch((error) => {
                trackJs.track(JSON.stringify(error))
                console.log(error)
            })
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
		        <div className="brands" ng-hide="list">
		            { this.state.popular_brands.map( ( brand, key ) => {
		            	if ( brand.is_popular && key < 15 )
		            		return <Brand brand={ brand } key={ key } />
		            })}

		            <div className="brand more" ng-show="loadMoreBtn" ng-click="showMore()">
		                <span>+</span>
		            </div>
		        </div>

		    	{/* Brands list */}
		        <div className="list-brands" ng-show="list">
		            <div className="letter" ng-repeat="letter in alphabeticalList">
		                <h1 style={{ borderBottom: '1px dotted rgba( 255, 255, 255, .2 )' }}></h1>
		                <ul className="unstyled-list v-list">
			                { this.state.brands.map( ( brand, key ) => {
				            	return <li ng-repeat="brand in letter.brands">
			                        <span className="btnuj" ng-className="" ng-click="">
			                            <span className="text">{ brand.name }</span>
			                        </span>
			                    </li>
			            	})}
		                </ul>
		            </div>
		        </div>
		    </div>
	    )
  	}

}