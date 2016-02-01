import { BRANDS } from '../actions/Ux3Actions'


const initialState = {
	brands: []
}

function Brands ( state = initialState, action ) {

	switch ( action.type ) {
		case BRANDS:
			return Object.assign({}, state, {
				brands: action.
			})
		default:
			return state
	}

}
