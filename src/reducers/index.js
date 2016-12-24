import {combineReducers} from 'redux';
import {stationsLoad,stationDataLoad} from './stations';
import {filter} from './filter';
const weatherStattionsApp = combineReducers({
	stationsStore: stationsLoad,
	activeStation: stationDataLoad,
	filter
});

export default weatherStattionsApp