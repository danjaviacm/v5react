import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class Birth extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: 'cedula',
	  		selected: '',
            years: [],
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            days: [],
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear() - 18
	  	}

	  	context.router
  	}

    isActiveYear ( value ) {
        return `square ${ (( value === this.state.selectedYear ) ? 'active': 'default' ) }`
    }

    isActiveMonth ( value ) {
        return `square ${ (( value === this.state.selectedMonth ) ? 'active': 'default' ) }`
    }

  	isActiveDay ( value ) {
    	return `square ${ (( value === this.state.selectedDay ) ? 'active': 'default' ) }`
  	}

    fillYears () {

        let date = new Date()

        let max_year = date.getFullYear() - 18

        if ( this.state.identification_type == 'nit' )
            max_year = date.getFullYear()

        let min_year = max_year - 70

        let all_values = []

        for ( let i = min_year; i <= max_year; i++ ) {
            all_values.push( i )
        }

        this.setState({ years: all_values })
    }

    getNumberOfMonth ( month ) {
        switch ( month ) {
            case 'Enero':
                return 0
                break
            case 'Febrero':
                return 1
                break
            case 'Marzo':
                return 2
                break
            case 'Abril':
                return 3
                break
            case 'Mayo':
                return 4
                break
            case 'Junio':
                return 5
                break
            case 'Julio':
                return 6
                break
            case 'Agosto':
                return 7
                break
            case 'Septiembre':
                return 8
                break
            case 'Octubre':
                return 9
                break
            case 'Noviembre':
                return 10
                break
            case 'Diciembre':
                return 11
                break
        }
    }

    getMonthDays ( month, year ) {
        return ( month === 1 && year % 4 === 0 && ( year % 100 !== 0 || year % 400 === 0 )) ? 29 : [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][ month ]
    }

    fillDays () {

        let all_values = []

        for( let i = 1; i <= this.getMonthDays( this.state.month, this.state.year ); i++ ) {
            all_values.push( i )
        }

        this.setState({ days: all_values })
    }

  	componentWillMount () {

        this.fillYears()
        this.fillDays()
  	}

    selectYear ( year ) {

        this.setState({ year: parseInt( year ), selectedYear: parseInt( year ) }, () => this.fillDays() )
    }

    selectMonth ( month ) {

        this.setState({ month: this.getNumberOfMonth( month ), selectedMonth: month }, () => this.fillDays() )
    }

    selectDay ( day ) { 

        this.setState({ day: parseInt( day ), selectedDay: parseInt( day ) })
    }

  	continue ( filter ) {

        let birthday = this.state.year + '-' + ( this.state.month + 1 ) + '-' + this.state.day 
        console.log( birthday )
  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-date-of-birth" className="step step-date-of-birth">
                
                { this.state.identification_type != 'nit' ? <header ng-if="identification_type != 'nit'">
                    <h1>¿En qué fecha naciste?</h1>
                </header> : null }

                { this.state.identification_type == 'nit' ? <header ng-if="identification_type == 'nit'">
                    <h1>¿Fecha de creación?</h1>
                </header> : null }

                <table align="center">
                    <tbody>
                        <tr>
                            <td className="hidden-xs" valign="top">
                                <div className="title-section">Año</div>
                            </td>
                            <td valign="top" align="left">
                                <div className="title-section-inline visible-xs">Año</div>
                                <div className="squares">
                                    { this.state.years.map( ( year, key ) => {
                                        return <div className={ this.isActiveYear( year) } key={ key } onClick={ this.selectYear.bind( this, year ) }>
                                            { year }
                                        </div>
                                    })}
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>&nbsp;</td>
                        </tr>

                        <tr>
                            <td className="hidden-xs" valign="top">
                                <div className="title-section">Mes</div>
                            </td>
                            <td valign="top" align="left">
                                <div className="title-section-inline visible-xs">Mes</div>
                                <div className="squares">

                                    { this.state.months.map( ( month, key ) => {
                                        return <div className={ this.isActiveMonth( month ) } key={ key } onClick={ this.selectMonth.bind( this, month ) }>
                                            { month }
                                        </div>
                                    })}
                                
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>&nbsp;</td>
                        </tr>

                        <tr>
                            <td className="hidden-xs" valign="top">
                                <div className="title-section">Día</div>
                            </td>
                            <td valign="top" align="left">
                                <div className="title-section-inline visible-xs">Día</div>
                                <div className="squares">
                                    
                                    { this.state.days.map( ( day, key ) => {
                                        return <div className={ this.isActiveDay( day ) } key={ key } onClick={ this.selectDay.bind( this, day ) }>
                                            { day }
                                        </div>
                                    })}
                                
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <button className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button>
            </div>
	    )
  	}

}