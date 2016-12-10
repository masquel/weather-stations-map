import {ACTIONS} from '../config/consts';

export const stationsLoad = (state = {loading: true, stations: []}, {type,loading,stations}) => {
	switch(type){
		case ACTIONS.LOAD_STATIONS: {
			return {
				stations: [],
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

export const stationDataLoad = (state = {station:{},loading:false}, {type,loading,station}) => {
	switch(type){
		case ACTIONS.LOAD_STATION: {
			return {
				loading
			}
		}
		case ACTIONS.SET_STATION: {
			return {
				station,
				loading
			}
		}
		default: 
			return state

	}
}
