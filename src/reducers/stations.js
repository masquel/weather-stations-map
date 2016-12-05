import {ACTIONS} from '../config/consts'

export const stationsLoad = (state = {loading: true, stations: []}, {type,loading,stations}) => {
	switch(type){
		case ACTIONS.LOAD_STATIONS: {
			return {
				loading
			}
		}
		case ACTIONS.SET_STATIONS:{
			return {
				stations,
				loading
			}
		}
		default:
			return state

	}
}
