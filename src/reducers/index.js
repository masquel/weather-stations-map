import {combineReducers} from 'redux';
import {stationsLoad} from './stations';
import {filter} from './filter';

const weatherStattionsApp = combineReducers({
	stationsStore: stationsLoad,
	filter
});

export default weatherStattionsApp