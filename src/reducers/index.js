import {combineReducers} from 'redux';
import {stationsLoad} from './stations';

const weatherStattionsApp = combineReducers({
	stationsStore: stationsLoad
});

export default weatherStattionsApp