import {ACTIONS} from '../config/consts';
import moment from 'moment';
export const filter = (state = {activeDay: new Date(),heatmap: false}, {type, day}) => {
	switch(type){
		case ACTIONS.SET_ACTIVE_DAY: {
			return {
				activeDay: day,
				heatmap: state.heatmap
			}
		}
		case ACTIONS.TOGGLE_HEATMAP: {
			return {
				activeDay: state.activeDay,
				heatmap: !state.heatmap
			}
		}
		default: return state
	}
}