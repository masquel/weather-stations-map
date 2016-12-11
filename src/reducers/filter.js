import {ACTIONS} from '../config/consts';
import moment from 'moment';
export const filter = (state = {activeMonth: {year: moment().year(), month: moment().month()},heatmap: false}, {type, month}) => {
	switch(type){
		case ACTIONS.SET_ACTIVE_MONTH: {
			return {
				activeMonth: month,
				heatmap: state.heatmap
			}
		}
		case ACTIONS.TOGGLE_HEATMAP: {
			return {
				activeMonth: state.activeMonth,
				heatmap: !state.heatmap
			}
		}
		default: return state
	}
}