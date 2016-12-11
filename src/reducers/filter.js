import {ACTIONS} from '../config/consts';
import moment from 'moment';

const defaultState = {
	activeMonth: {
		year: moment().year(), 
		month: moment().month()
	},
	heatmap: false,
	stationName: ""
}

export const filter = (state = defaultState, {type, month, name}) => {
	switch(type){
		case ACTIONS.SET_ACTIVE_MONTH: {
			return {
				activeMonth: month,
				heatmap: state.heatmap,
				stationName: state.stationName
			}
		}
		case ACTIONS.SET_FILTER_STATION_NAME: {
			return {
				activeMonth: state.activeMonth,
				heatmap: state.heatmap,
				stationName: name
			}
		}
		case ACTIONS.TOGGLE_HEATMAP: {
			return {
				activeMonth: state.activeMonth,
				heatmap: !state.heatmap,
				stationName: state.stationName
			}
		}
		default: return state
	}
}